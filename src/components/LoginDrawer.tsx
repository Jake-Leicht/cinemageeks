import React, {useRef} from "react";
import { Input, Button, Drawer, DrawerBody, 
    DrawerFooter, DrawerOverlay, DrawerContent, 
    DrawerCloseButton, DrawerHeader, useToast } from "@chakra-ui/react";
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/FirebaseConfig";

interface Props{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    btnRef: any;
}

const LoginDrawer = ({isOpen, onOpen, onClose, btnRef}: Props) => {

    const emailRef = useRef<string>("");
	const passwordRef = useRef<string>("");

    function signInSuccess(){
        toast({
            title: "Login Successful",
            position: "top",
            duration: 1500,
            status: statuses[0],
            isClosable: true
        });
        onClose();
    }

    function signInFailed(error: any){
        //console.log(`Error code: ${error.code}, Error Message: ${error.message}`);
        toast({
            title: `Login Failed: ${error.message}`,
            position: "top",
            duration: 1500,
            status: statuses[1],
            isClosable: true
        });
    }

    const signInUser = () => {
        // ! need user to remained logged in across pages
        try{
            setPersistence(auth, browserSessionPersistence).then(() => {
                return signInWithEmailAndPassword(auth, emailRef.current, passwordRef.current)
                .then((userCredential: any) => {
                    signInSuccess();
                }).catch((error: any) => {
                    signInFailed(error);
                });
            });
        } catch(error){
            signInFailed(error);
        }
    }

    const signInWithGoogle = async () => {
        try{
            setPersistence(auth, browserSessionPersistence).then(() => {
                return signInWithPopup(auth, provider)
                .then(() => {
                    signInSuccess();
                })
                .catch((error: any) => {
                    signInFailed(error);
                });
            });
        } catch (error){
            signInFailed(error);
        }
    }

    const signInWithDemo = () => {
        emailRef.current = "demoaccount@gmail.com";
        passwordRef.current = "demoPass01";
        signInUser();
    }

    const toast = useToast();
    const statuses: any = ['success', 'error', 'warning', 'info'];
    // * sucsess = sucess, warning = error, info = tip (item added to cart), warning = ?

    return(<>
        {/* <button ref={btnRef} onClick={onOpen}>Open</button> */}
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>
                <DrawerBody>
                    <Input color="black" placeholder='Email...' type="text" onChange={(input: any) => emailRef.current = input.target.value}/>
                    <Input color="black" placeholder="Password..." type="password" onChange={(input: any) => passwordRef.current = input.target.value}/>
                    <button onClick={signInWithGoogle}>Sign In With Google</button>
                    <button onClick={signInWithDemo}>Sign In with Demo Account?</button>
                </DrawerBody>
                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
                    <Button colorScheme='blue' onClick={signInUser}>Login</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>);
}

export default LoginDrawer;