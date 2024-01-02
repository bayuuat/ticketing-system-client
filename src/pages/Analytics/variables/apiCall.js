import customAxios from '@/utils/customAxios';

export const getCountAllTicket = async (param) => {
  try {
    const useParam = { start_date: param.start_date, end_date: param.end_date };
    const response = await customAxios.get('tickets/count-ticket', { params: useParam });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      // alert(error.response.data);
    } else {
      console.error(error);
    }
  }
};

export const getCountTicketByDepartment = async (param) => {
  try {
    const useParam = { start_date: param.start_date, end_date: param.end_date, departmentID: param.departmentID };
    const response = await customAxios.get('tickets/count-ticket', { params: useParam });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      // alert(error.response.data);
    } else {
      console.error(error);
    }
  }
};

export const getCountTicketByUser = async (param) => {
  if (!param?.userID) {
    return 0;
  }

  try {
    const response = await customAxios.get('tickets/count-ticket', { params: param });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      // alert(error.response.data);
    } else {
      console.error(error);
    }
  }
};

export const getResponseTimePerUser = async (param) => {
  try {
    const response = await customAxios.get(`tickets/response-time-department-per-user/${param.departmentID}`, {
      params: { start_date: param.start_date, end_date: param.end_date, granularity: 'monthly' },
    });

    if (response.status === 200) {
      const resp = response.data;
      const mappedData = resp.map(([id, name, date, avg, min, max, count]) => ({
        id: id,
        name: name,
        date: date,
        avg: avg,
        min: min,
        max: max,
        count: count,
      }));
      return mappedData;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      // alert(error.response.data);
    } else {
      console.error(error);
    }
  }
};
