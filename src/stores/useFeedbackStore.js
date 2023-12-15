import { defineStore } from "pinia";
import Api from "../Server/index.js";


export const useFeedbackStore = defineStore("feedbackStore", {
  state: () => ({
    feedbacks: [],
    links : [],
    errors : {},
    status : null,
    responseMessage : '',
    data : {
        email : null,
        message : null
    }
  }),
  actions: {
    async getFeedback(){
        try{

          const response = await Api().get('/admin/feedback');
          console.log(response.data);
          this.feedbacks = [...response.data.feedbacks.data]

        } catch(error){

        }
    },
    async addFeedback(data) {
        console.log(data)
      try {
        const response = await Api().post("/feedback", data);

        console.log(response)
  
        this.status = response.status
        this.responseMessage = response.data.message
        this.data = {
          email : null,
          massage : null
        }

      } catch (error) {
        console.log(error);
        this.errors = {
            ...error.response.data.errors
        }
      }
    },
  },
});
