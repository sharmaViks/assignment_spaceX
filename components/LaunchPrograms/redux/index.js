import { Creators } from './actions';
const allPrograms = Creators.allPrograms;
const API_URL = "https://api.spaceXdata.com/v3/launches?limit=100"

const get_programs = (filters=[]) => {

	return dispatch => {
		let url = new URL(API_URL);
		if(filters.length > 0){
			let params = {limit:100};
			for(let i=0;i<filters.length;i++){
				params[filters[i]["type"]] = filters[i]["value"];
			}
			url.search = new URLSearchParams(params).toString();
		}
		return fetch(url, {
			method: 'GET',
			headers: {
				Accept: "application/json"
			}
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch(allPrograms(data))
			})
			.catch((err) => {
				console.log(err)
			})
	}

};

export default { get_programs }