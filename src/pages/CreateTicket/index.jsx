import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { ComboboxDemo } from '@/components/SearchSelect/new';
import FileDropZone from '@/components/fields/FilesDrop';
import InputField from '@/components/fields/InputField';
import TextField from '@/components/fields/TextField';
import { Toaster } from '@/components/shadcn/components/ui/toaster';
import { useToast } from '@/components/shadcn/components/ui/use-toast';
import customAxios from '@/utils/customAxios';
import FooterHome from '@/pages/CreateTicket/components/FooterHome';
import NavbarHome from '@/pages/CreateTicket/components/NavbarHome';
import SeveritySelect from '@/pages/CreateTicket/components/SeveritySelect';

const formBody = {
  subject: '',
  severity: '',
  content: '',
  tag: '',
  attachment: '',
};

const CreateTicket = () => {
  const [form, setForm] = useState(formBody);
  const [selectedFile, setSelectedFile] = useState([]);
  const [tagList, setTagList] = useState(formBody);
  const customer = Cookies.get('user_detail');
  const customerData = JSON.parse(customer);
  const { toast } = useToast();

  useEffect(() => {
    // getTicketTagList();
  }, []);

  const getTicketTagList = async () => {
    try {
      const response = await customAxios.get(`/ticket-tag/list`);
      if (response.status === 200) {
        setTagList(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (form.subject === '' || form.severity === '' || form.body === '' || form.tag === '') {
      toast({
        variant: 'destructive',
        title: 'Uncomplete Form!',
        description: 'There are blank form there.',
      });
      return;
    }

    try {
      const response = await postTicket(customerData.customerID);
      if (response.status === 201) {
        const uploadFile = await uploadFiles(response.data.ticketID);
        if (uploadFile.status === 201) {
          toast({
            title: 'Success sending the ticket!',
            description: 'Your tickets will be handled.',
          });
          setForm(formBody);
        } else {
          console.error('Unexpected response status for file upload:', uploadFile.status);
          throw new Error('File upload failed');
        }
      } else {
        console.error('Unexpected response status:', response.status);
        throw new Error('Ticket creation failed');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast({
          description: error.response.data,
        });
      } else {
        console.error(error);
      }
    }
  };

  const postTicket = async (id) => {
    const submitForm = { ticketContent: form.body, ticketTagID: 34, severityID: form.severity, customerID: id, ticketAttachmentPath: '/' };
    try {
      const response = await customAxios.post('/customers/save-ticket', submitForm);

      if (response.status === 201) {
        return response;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        throw `error: ${error.response.data}`;
      } else {
        throw `error: ${error}`;
      }
    }
  };

  const uploadFiles = async (id) => {
    const formData = new FormData();
    const selectedFilesArray = Array.from(selectedFile);
    selectedFilesArray.forEach((file) => {
      formData.append(`files`, file);
    });
    console.log(selectedFilesArray);
    console.log(formData);
    try {
      const response = await customAxios.post(`attachments/upload/multiple/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        return response;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        throw `error: ${error.response.data}`;
      } else {
        throw `error: ${error}`;
      }
    }
  };

  return (
    <>
      <div className="min-h-screen h-full w-full dark:!bg-navy-900">
        <NavbarHome />
        <main className="mx-auto py-8">
          <div className="flex">
            <div className="mx-auto flex flex-col min-h-full w-full justify-start pt-12 md:max-w-[75%] lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:max-w-[1383px] xl:px-0 xl:pl-[70px] dark:text-white">
              <div className="flex">
                <div className="w-1/3">
                  <h5 className="font-semibold">Personal Information</h5>
                  <h6 className="text-gray-600">Information about the customer</h6>
                </div>
                <div className="w-2/3">
                  <InputField
                    extra="mb-4"
                    label="Full Name"
                    placeholder="Type your full name..."
                    id="name"
                    name="name"
                    type="text"
                    disabled
                    value={customerData.name}
                    onChange={handleFormChange}
                  />
                  <InputField
                    extra="mb-4"
                    label="Email"
                    placeholder="Type your email address..."
                    id="email"
                    name="email"
                    type="email"
                    disabled
                    value={customerData.email}
                    onChange={handleFormChange}
                  />
                  <InputField
                    extra="mb-4"
                    label="Phone"
                    placeholder="Type your phone number..."
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    disabled
                    value={customerData.phoneNumber}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <hr className="my-6 dark:border-gray-600" />
              <div className="flex">
                <div className="w-1/3">
                  <h5 className="font-semibold">Ticket Content</h5>
                  <h6 className="text-gray-600">Elevate your customer service needs </h6>
                </div>
                <div className="w-2/3">
                  <InputField
                    extra="mb-4"
                    label="Subject"
                    placeholder="Type your ticket's subject..."
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleFormChange}
                  />
                  <ComboboxDemo
                    extraClass="mb-4"
                    label="Ticket Tag"
                    name="tag"
                    placeholder="Choose your tickets tag..."
                    onChange={handleFormChange}
                  />
                  <SeveritySelect label="Ticket Severity" onChange={handleFormChange} />
                  <TextField
                    extra="mb-4"
                    rows={4}
                    label="Description"
                    placeholder="Type everything you want to share..."
                    id="content"
                    value={form.content}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <hr className="my-6 dark:border-gray-600" />
              <div className="flex">
                <div className="w-1/3">
                  <h5 className="font-semibold">Attachments</h5>
                  <h6 className="text-gray-600">Share your discovery files</h6>
                </div>
                <div className="w-2/3">
                  <FileDropZone selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                </div>
              </div>
            </div>
          </div>
        </main>
        <FooterHome onButtonClick={handleOnSubmit} />
      </div>
      <Toaster />
    </>
  );
};

export default CreateTicket;
