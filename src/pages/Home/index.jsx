import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Card from '@/components/card';
import InputField from '@/components/fields/InputField';
import { Toaster } from '@/components/shadcn/components/ui/toaster';
import { useToast } from '@/components/shadcn/components/ui/use-toast';
import customAxios from '@/utils/customAxios';
import NavbarHome from '@/pages/CreateTicket/components/NavbarHome';

import Cookies from 'js-cookie';

const formBody = {
  email: '',
  name: '',
  phoneNumber: '',
};

const Home = () => {
  const [form, setForm] = useState(formBody);
  const { toast } = useToast();
  const navigate = useNavigate();

  const accessToken = Cookies.get('user_detail');

  if (accessToken) {
    return <Navigate to="/ticket" />;
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const postCustomer = async (e) => {
    e.preventDefault();
    const submitForm = { email: form.email, phoneNumber: form.phoneNumber, name: form.name };
    if (form.email == '' || form.phoneNumber == '' || form.name == '') {
      toast({
        variant: 'destructive',
        title: 'Uncomplete Form!',
        description: 'There are blank form there.',
      });
      return;
    }
    try {
      const response = await customAxios.post('/customers/save-or-update', submitForm);

      if (response.status === 201) {
        toast({
          title: 'Success logging in!',
          description: 'You are ready to ticketing.',
        });
        Cookies.set('user_detail', JSON.stringify(response.data));
        navigate('/create-ticket');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      throw `error: ${error}`;
    }
  };

  return (
    <>
      <div className="min-h-screen h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <NavbarHome />
        <main className="mx-auto py-8">
          <div className="flex">
            <div className="mx-auto flex flex-col min-h-full w-full justify-center pt-12 md:max-w-[75%] lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:max-w-[1383px] xl:px-0 xl:pl-[70px] dark:text-white">
              <div className="flex flex-col justify-center items-center mb-10">
                <h1 className="text-5xl font-semibold tracking-tight">Ticketing Excellence: Your Journey, Our Service.</h1>
                <h2 className="mt-4 text-xl text-gray-700 tracking-tight">Contact KBDSI Customer Services. How can we help?</h2>
              </div>
              <Card extra={'w-full h-full p-6'}>
                <form>
                  <InputField
                    extra="mb-4"
                    label="Full Name"
                    placeholder="Type your full name..."
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                  />
                  <InputField
                    extra="mb-4"
                    label="Email"
                    placeholder="Type your email address..."
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    required
                    onChange={handleFormChange}
                  />
                  <InputField
                    extra="mb-4"
                    label="Phone"
                    placeholder="Type your phone number..."
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={form.phoneNumber}
                    required
                    onChange={handleFormChange}
                  />
                  <span className="flex w-full rounded-md sm:w-auto mt-4 float-right">
                    <button
                      onClick={postCustomer}
                      type="submit"
                      className="inline-flex justify-center rounded-md px-6 py-2 mr-4 bg-orange-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Submit
                    </button>
                  </span>
                </form>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
};

export default Home;
