import apiClient from "./client";

export const getProvidersByLocation = async (lat, long, range) => {
    try {
      const response = await apiClient.get(`/providers/${lat}/${long}/${range}`);
      console.log('getProvidersByLocation response:', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching providers:', error);
      throw error;
    }
  };
  