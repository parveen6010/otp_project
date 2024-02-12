
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import "./index.css"
import OtpInput from "otp-input-react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import admincardIcon from "./admitKard.svg";
import loginpic from "./loginpic.svg";
import verfiypic from "./verfiypic.svg";


const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
      
  useEffect(() =>{
    localStorage.setItem("dataKey", JSON.stringify(ph));
  },[ph])


 function setotpheadline() {
    try {
      const storedPh = localStorage.getItem('dataKey');
      if (storedPh) {
        const parsedPh = JSON.parse(storedPh);
        setPhone(parsedPh);
      }
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
    }
  };
  
 console.log(phone);
//  console.log("ff");


  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult ) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
        setotpheadline();
      })
      .catch((error) => {
        
        console.log(error);
        setLoading(false);
      });
  }
  
  function resendfuntion(){
    const storedph =  localStorage.getItem('dataKey');
    if (storedph) {
      setPh(JSON.parse(storedph));
   }
   onSignup();  
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);  
    localStorage.removeItem('dataKey');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }


  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <>
            <img src={loginpic} className="loginpic"/>
            <br/>
          <h2 className="text-center text-black font-medium text-2xl">
          Welcome to AdmitKard
          </h2>
          <br/>
          <h2 className="text-center text-black font-medium text-1xl">
          In order to provide you with
          </h2>
          <h2 className="text-center text-black font-medium text-1xl">
          a custom experience, 
          </h2>
          <h2 className="text-center text-black font-medium text-1xl">
          we need to ask you a few questions. 
          </h2>
          <br/>
         
             <button
                  className="loginget "
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Get Start</span>
                </button>
                
          </>
          
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            
            {showOTP ? (
              <>
               <img src={verfiypic} className="verfiypic"/>
              <h1 className="text-center leading-normal text-black font-medium text-xl">
              Please verify Mobile number
            </h1>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
              
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
               htmlFor="otp"
               className="font-small text-1xl text-black text-center"
             >
              An OTP is sent to +{phone}
             </label>
                <label
                  htmlFor="otp"
                  className="font-medium text-xl text-black text-center"
                >
                  Enter your OTP
                </label> 
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                  
                ></OtpInput>
                
                <div className="resendbutton text-aling"  >
                <label
               htmlFor="otp"
               className="font-small text-1xl text-black text-center"
               style={{marginLeft:32}}
             >
              Didn't recive the code?
             </label>
             <button
                  onClick={resendfuntion}
                  style={{marginLeft:10, color: "green"}}
                   >
                  <span>Resend</span>
                </button>
                </div>

                <button
                  onClick={onOTPVerify}
                  className=" logingetstart"  
                   >
                  <span>Verify OTP</span>
                </button>

              </>
            ) : (
              <>
        
              <img src={admincardIcon} className="admincardIcon"/>
              <h1 className="text-center leading-normal text-black font-medium text-2xl">
              Welcome Back
            </h1>
            <h1 className="text-center leading-normal text-black font-medium text-1exl ">
              Please Sign in to your account
            </h1>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-medium text-xl text-medium text-center"
                >
                 Enter Contact number
                </label>
                <label
                  className="charge"
                >
                 We send you one time SMS message. Charges apply.
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                
                <button
                  onClick={onSignup}
                  className=" logingetstart"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
          
           </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
