import apiClient from "./client";

export const getEventById = async (eventId) => {
    try {
      const response = await apiClient.get(`/events/${eventId}`);
      console.log('getEventById response:', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  };
  