import { useState, useEffect } from "react";
import { getIndexData, getQueryData } from "../lib/Pixels";
import { Alert } from "react-native";

const usePixel = ({ type, pageNumber, query }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    if (type === "index") {
      try {
        setLoading(true);
        if (!pageNumber) pageNumber = 1;
        const responce = await getIndexData(pageNumber);
        setData(responce);
      } catch (error) {
        Alert.alert("Error", error);
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    }
    if (type === "search") {
      try {
        setLoading(true);
        if (!pageNumber) pageNumber = 1;
        const responce = await getQueryData(query, pageNumber);
        setData(responce);
      } catch (error) {
        Alert.alert("Error", error);
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("In the sueffect");
    fetchData();
  }, []);

  return { data, loading };
};

export default usePixel;
