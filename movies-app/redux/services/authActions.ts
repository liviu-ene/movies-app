import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { storeAuthToken } from '@/lib/auth';

const backendURL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ identifier, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.post(
          `${backendURL}/auth/local`,
          { identifier, password },
          config
        )
        // store user's token in local storage
        storeAuthToken(data);
        return data
      } catch (error) {
        console.log(error);
        // return custom error message from API if any
        if (error.response && error.response.data.error.message) {
          return rejectWithValue(error.response.data.error.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

export const registerUser = createAsyncThunk(
  '/auth/register',
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${backendURL}/auth/local/register`,
        { email, username, password },
        config
      )
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.error.message) {
        return rejectWithValue(error.response.data.error.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)