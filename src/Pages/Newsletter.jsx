import axios from "axios";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        const response = await axios.post(newsletterUrl, data);

        console.log(response);
        toast.success(response.data.msg);

        return redirect('/');
    } catch {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const Newsletter = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form className="form" method="POST">
            <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Our newsletter
            </h4>
            <div className="form-row">
                <label htmlFor="name" className="form-label">name</label>
                <input type="text" className="form-input" name="name" id="name" required />
            </div>
            <div className="form-row">
                <label htmlFor="name" className="form-label">Last name</label>
                <input type="text" className="form-input" name="lastname" id="lastname" required />
            </div>
            <div className="form-row">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-input" name="email" id="email" required />
            </div>
            <button
                type="submit"
                className="btn btn block"
                style={{ marginTop: '0.5rem' }}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting' : Submit}
            </button> 
        </Form>
    );
};

export default Newsletter;