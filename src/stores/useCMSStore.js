import {defineStore} from 'pinia'
import Api from './../Server/index.js'


export const useCMSStore = defineStore('CMSStore', {
    state : () => ({
        gallery : [],
        carousels : [],
        topProducts : [],
        headerData : {
            image_url : null,
            caption : null
        },
        status : null,
        errors : {},
        messageResponse : null,
        isLoading : false
    }),
    getters : {
        setImageURL(){
            return (imageURL) => {
                this.headerData.image_url = imageURL
            }
        }
    },
    actions : {
        async uploadImage(imageData) {
            try {

                const response = await Api().post('/admin/cms/upload/image', imageData);

                this.gallery = [...response.data.gallery];
                this.status = response.status
                
            } catch (error) {
                
            
               this.status = error.response.status
               console.log(this.status);

               this.messageResponse = error.response.data.message
                
            }
        }, 
        async getGallery(){


            try {


                this.isLoading = true;
                
                const response = await Api().get('/admin/cms/gallery');


                this.gallery = [...response.data.gallery];

                this.isLoading = false

            } catch (error) {
                

                this.status = error.response.status
                this.messageResponse = error.response.data.message
              

            }

        },
        async getCarousel(){
            try {
                
                this.isLoading = true;
                const response = await Api().get('/carousel');
                console.log(response.data)
                this.carousels = [...response.data]
                
                this.isLoading = false;

            } catch (error) {

                console.log(error)

                console.log(error.response?.status)
                
                this.status = error.response?.status
                this.messageResponse = error.response?.data.message

            }
        },
        async uploadHeader(){
            try {
                

                const formData = new FormData()
                formData.append('image_url', this.headerData.image_url)
                formData.append('caption', this.headerData.caption)


                const response = await Api().post('/admin/cms/upload/carousel', formData);

                this.status = response.status
                this.messageResponse = response.data.message

                this.headerData = {
                    image_url : null,
                    caption : null
                }

            } catch (error) {

                this.status = error.response.status
                this.messageResponse = error.response.data.message
                console.log(error)
            }
        },
        async archiveCarousel (id){

            try {
            

                const response = await Api().post(`/admin/cms/carousel/${id}/archive`);


                this.status = response.status
                this.messageResponse = response.data.message
                this.carousels = [...response.data.carousels]


            } catch (error) {

                console.log(error)

                this.status = error.response?.status
                this.messageResponse = error.response?.data.message
                
            }

        },
    }
})