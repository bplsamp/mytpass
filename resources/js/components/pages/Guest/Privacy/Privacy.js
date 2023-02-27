import React from 'react'
import Footer from '../../../footer/Footer'
import GuestPage from '../../../layouts/GuestPage'

export default function About() {
  return (
    <GuestPage>
      <div className="flex flex-row">
          <h1 className="ml-auto mr-auto text-torange font-bold text-[2rem] py-6 justify-center">
              Privacy Policy
          </h1>
      </div>
        <div className='flex flex-row text-justify justify-center items-center gap-[10rem] py-10'>
          <p className='w-[600px] text-[1.3rem]'>

            We, MyTPass, are responsible for maintaining and protecting user information under our control. 
            As Part of this commitment, Our actions regarding the gathering, using, and disclosing of 
            Personal Information are governed by our privacy policy.

            <br></br>
            <br></br>

            The information shared/ provided by the user in MyTPass allows us to provide the best service for 
            users to have a better system experience.
            
            <br></br>
            <br></br>

            All the provided Data by users will be maintained as accurate and complete. MyTPass will not disclose 
            any user information anywhere outside the system. Rest assured that User data and information will be secured. 

            <br></br>
            <br></br>

            User data will remain in MyTPass as long as a user’s account is active/registered to MyTPass. 
            Deactivation/ Deletion of accounts will remove their data permanently as well.

            <br></br>
            <br></br>

            Knowledge and Consent comes before collecting user data. Users always have a choice to provide their personal information, 
            However, We are afraid that a user’s decision of not to provide their information limits the services that MyTPass offer.

            <br></br>
            <br></br>

            If you have any questions or concerns about our privacy policy, you can reach us at:

            <br></br>
            <br></br>
            
            MyTPass Admin: +63 928-934-1928
          </p>
        </div>
        <Footer/>
    </GuestPage>
  )
}
