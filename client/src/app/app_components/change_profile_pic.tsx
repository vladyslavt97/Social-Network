import { Link } from "react-router-dom";

export function ChangeProfilePic() {
    // handleSubmit(event){
    //         event.preventDefault();

    //         const formData = new FormData();
    //         formData.append('filee', this.file);

    //         fetch('/profile-pic', {
    //             method: 'POST', 
    //             body: formData
    //         })
    //             .then(res => {
    //                 return res.json();
    //             })
    //             .then(alldata => {
    //                 console.log('alldata', alldata.myObj[0]);
    //                 if (this.images.length > 5){
    //                     this.images.unshift(alldata.myObj[0]);
    //                     this.images.pop();
    //                 } else {
    //                     this.images.unshift(alldata.myObj[0]);
    //                 }
    //                 console.log("this.images:", this.images);
    //             })
    //             .catch(err => {
    //                 console.log('er: ', err);
    //             });
    //         }            
    return <div>
            <form action="">
                <img src="noprofile.png" alt="empty" id="no-profile-pic"/>
                
                {/* <button type="file" name="filee" accept="image/*" v-on:change="handleFileChange">Button</button> */}
            </form>
            </div>
}