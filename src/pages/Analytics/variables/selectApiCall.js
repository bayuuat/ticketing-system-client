import { useEffect, useState } from 'react';
import { useToast } from '@/components/shadcn/components/ui/use-toast';
import customAxios from '@/utils/customAxios';
import Cookies from 'js-cookie';

export const useGetDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const { toast } = useToast;
  const idDept = Cookies.get('department_id');
  const idRole = Cookies.get('role_id');

  const fetch = async () => {
    try {
      const response = await customAxios.get('departments/view');
      if (response.status === 200) {
        const depart = response.data;
        const mappedData = depart.map((data) => {
          return {
            value: data.departmentID,
            label: data.departmentName,
          };
        });
        setDepartments(mappedData);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
        toast({
          title: 'Oops! Something Went Wrong.',
          description: error.response.data,
        });
      } else {
        toast({
          description: error,
        });
      }
    }
  };

  useEffect(() => {
    if (idRole != 1) {
      setDepartments([{ value: idDept, label: idDept }]);
    } else {
      fetch();
    }
  }, []);

  return { data: departments };
};

export const useGetUsers = (id) => {
  const [users, setUsers] = useState([]);
  const { toast } = useToast;
  const idUser = Cookies.get('user_id');
  const idRole = Cookies.get('role_id');

  const fetch = async () => {
    try {
      const response = await customAxios.get('/departments/view/staff/' + id);
      if (response.status === 200) {
        const user = response.data.users;
        const mappedData = user.map((data) => {
          return {
            value: data.userID,
            label: `${data.userID} - ${data.name}`,
          };
        });
        setUsers(mappedData);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
        toast({
          title: 'Oops! Something Went Wrong.',
          description: error.response.data,
        });
      } else {
        toast({
          description: error,
        });
      }
    }
  };

  useEffect(() => {
    if (idRole != 1) {
      setUsers([{ value: idUser, label: idUser }]);
    } else {
      fetch();
    }
  }, [id]);

  return { data: users };
};
