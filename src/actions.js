export const SET_FILES_DATA = 'SET_FILES_DATA';
export const SET_LOADING = 'SET_LOADING';

export const setFilesData = (data) => ({
  type: SET_FILES_DATA,
  payload: data
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});