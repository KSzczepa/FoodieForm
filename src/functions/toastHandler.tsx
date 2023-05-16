import { toast } from "react-toastify";

export function toastHandler(toastType: string, message?: string) {
    switch (toastType) {
        case 'PENDING': {
            toast.info('Submitting...', {
                position: toast.POSITION.TOP_RIGHT, 
                toastId: 'pending'
            });
            break;
        }
        case 'SUCCESS': {
            setTimeout(() => {
                toast.dismiss('pending');
            }, 250);

            toast.success('Message sent!', {
                position: toast.POSITION.TOP_RIGHT
            });

            break;
        }
        case 'ERROR': {
            setTimeout(() => {
                toast.dismiss('pending');
            }, 250);
            
            toast.error('An error occured:\n' + message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
}