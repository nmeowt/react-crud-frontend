export const API_ENDPOINT = process.env.REACT_APP_API_URL;

export const JSON_FORM_DATA_OPTIONS = {
    showLeafArrayIndexes: true,
    includeNullValues: false,
};

export const API = {
    LIST_STUDENT: API_ENDPOINT + "/getAllStudent",
    ADD_UPDATE_STUDENT: API_ENDPOINT + "/addOrUpdateStudent",
    DELETE_STUDENT: API_ENDPOINT + "/deleteStudent",
    LIST_CLASS: API_ENDPOINT + "/getAllClass",
    ADD_UPDATE_CLASS: API_ENDPOINT + "/addOrUpdateClass",
    DELETE_CLASS: API_ENDPOINT + "/deleteClass"
}