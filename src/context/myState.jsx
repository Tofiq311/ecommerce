import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';


function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);

    // User State
    const [getAllProduct, setGetAllProduct] = useState([]);

      // user State 
      const [getAllUser, setGetAllUser] = useState([]);

      // Order State 
    const [getAllOrder, setGetAllOrder] = useState([]);

/**=======================================GET All Product Function=================================
     *========================================================================**/

    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    /**=======================================GET All User Function=================================
     *========================================================================**/


    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "user"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    /**=================================================GET All Order Function=======================
     *========================================================================**/

    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "order"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    // Delete oder Function
    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'order', id))
            toast.success('Order Deleted successfully')
            getAllOrderFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllProductFunction();
        getAllUserFunction();
        getAllOrderFunction();
    }, []);


    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllUser,
            getAllOrder,
            deleteProduct
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState