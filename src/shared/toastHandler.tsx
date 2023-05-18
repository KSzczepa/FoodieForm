import { toast } from "react-toastify";

export function toastHandler(toastType: string, message?: string | string[]) {
    switch (toastType) {
        case 'PENDING': {
            const defaultMessage = 'Submitting...';
            const messageToDisplay = message ? message : defaultMessage;
            
            toast.info(messageToDisplay, {
                position: toast.POSITION.TOP_RIGHT, 
                toastId: 'pending',
                autoClose: false
            });
            break;
        }
        case 'SUCCESS': {
            const defaultMessage = 'Success!';
            const messageToDisplay = message ? message : defaultMessage;

            setTimeout(() => {
                toast.dismiss('pending');
            }, 250);

            toast.success(messageToDisplay, {
                position: toast.POSITION.TOP_RIGHT
            });

            // setTimeout(() => {
            //     toast.update('pending', {
            //         render: 'Message sent!',
            //         type: toast.TYPE.SUCCESS,
            //         autoClose: 5000, 
            //       });                
            // }, 250);

            break;
        }
        case 'ERROR': {
            const defaultMessage = 'An error occured.';
            // const messageToDisplay = message ? message : defaultMessage;
            // let messageToDisplay;

            // if (message && message?.length !== undefined && message?.length > 1) {
            //     // messageToDisplay = 'An error occured.' + <br />;
            //     for (let i=0; i<message.length; i++) {
            //         messageToDisplay = messageToDisplay + message[i] + '\n';
            //     }
            // }
            // else 
            //     messageToDisplay = defaultMessage;

            setTimeout(() => {
                toast.dismiss('pending');
            }, 250);
            
            toast.error(<div>{defaultMessage}<br />{message}</div>, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
}