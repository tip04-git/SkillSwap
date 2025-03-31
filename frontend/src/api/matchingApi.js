import API from "./axiosConfig";

export const fetchMatches = async (userId) => {
    const response = await API.get(`/matching/match/${userId}`);
    return response.data;
};
