import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
const OrderSuccess = () => {
    const { orderId } = useParams();
    const [payment, setPayment] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/getPaymentDetail/${orderId}`);
            setPayment(response.data);
       
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
       
        fetchProduct();
      
      }, [orderId]);

      if (!payment) {
        return <div>Loading...</div>;
      }
    
  return (
    <div>

        <div>
            Payment Completed
        </div>
        <div>
            Amount {payment.amount}
        </div>
        <div>
           Status: {payment.status}
        </div>
    </div>
  )
}

export default OrderSuccess