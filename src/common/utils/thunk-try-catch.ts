import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatch, RootState } from "@/app/store"
type Options = { showGlobalError?: boolean }
export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  promise: () => Promise<T>,
  options?: Options,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { showGlobalError } = options || {}
  const { rejectWithValue } = thunkAPI

  try {
    return await promise()
  } catch (e) {
    return rejectWithValue({ error: e, showGlobalError })
  }
}
