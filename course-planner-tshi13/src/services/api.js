import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://courses-api-hw4.herokuapp.com",
  headers: {
    Authorization: "tshi13",
  },
});


async function get(url) {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getAll() { //get all courses in planner, contains id,status
  const response = await get(`/api/courses`);
  return response.data;
}


async function create(course) { //add course to planner. input contains status, returns id
  try {
    const response = await axiosInstance.post(`/api/courses`, course);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

async function remove(course) { //delete from planner
  try {
    const response = await axiosInstance.delete(`/api/courses/${course._id}`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

async function update(course, status) { //change status
  try {
    const response = await axiosInstance.patch(`/api/courses/${course._id}`, {
      status: status,
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

async function search(query, page = 1, limit = 20) { //no status, no id returned
  if (!query) {
    return {
      data: [],
      pagination: {},
      links: {},
    };
  } else {
    return get(`/api/search?query=${query}&page=${page}&limit=${limit}`);
  }
}

export { get, getAll, create, remove, update, search };



