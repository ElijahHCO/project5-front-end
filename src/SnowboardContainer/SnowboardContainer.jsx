import { useState, useEffect, useContext } from 'react';
import { Router } from 'react-router';
import Nav from '../Nav';
import LocationContext from '../LocationContext';
import NewSnowboardComponent from './NewSnowComponent.jsx/NewSnowComponent';
import SingleSnowboardComponent from './SingleSnowComponent.jsx/SingleSnowComponent';

const SnowboardContainer = () => {
    const {locations} = useContext(LocationContext)
    const [snows, setSnows] = useState([])
    const [newSnowServerError, setNewSnowServerError] = useState("")
    const createNewSnow = async (newSnow) => {
        try{
            const apiResponse = await fetch("https://project5-backend.herokuapp.com/equips", {
                method: "POST",
                body: JSON.stringify(newSnow),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json()
            // const newSnows = parsedResponse.data
            console.log(parsedResponse)
            if (parsedResponse.success) {
                getSnows()
                // setSnows([newSnows, ...snows])
                console.log(snows)
            } else {
                setNewSnowServerError(parsedResponse.data)
                console.log(parsedResponse)
            }
        }catch(err){
          console.log(err.message)
        }
    }
    const deleteSnows = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`https://project5-backend.herokuapp.com/equips/${idToDelete}`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json()
            if (parsedResponse.success) {
                const newSnows = snows.filter(snows => snows._id !== idToDelete)
                setSnows(newSnows)
            } else {
               
            }
            console.log(parsedResponse)
        } catch (err) {
           console.log(err)
        }
        console.log("deleting item ID" + idToDelete)
    }
    const getSnows = async () => {
        try {
            const snows = await fetch('https://project5-backend.herokuapp.com/equips/snowboard', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedSnows = await snows.json();
            console.log(parsedSnows)
            setSnows(parsedSnows.data)
        } catch (err) {
            
        }
    }
    const updateSnow = async (idToUpdate ,snowsToUpdate) => {
        try{
            const apiResponse = await fetch(`https://project5-backend.herokuapp.com/equips/${idToUpdate}`, {
                method: "PUT",
                body: JSON.stringify(snowsToUpdate),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if(parsedResponse.success){
                // const newSnows = snows.map(snows => snows._id === idToUpdate ? snowsToUpdate : snows)
                // setSnows(newSnows)
                getSnows()
            }else{
        
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getSnows()
    }, [])
    return (
        <div key={"key"}>
            <h2 className="header-two">Equipment</h2>
            <div className="display-div">
            <NewSnowboardComponent
                locations={locations}
                newSnowServerError={newSnowServerError}
                createNewSnow={createNewSnow}></NewSnowboardComponent>
            {snows.map((snows) => {
                return <SingleSnowboardComponent key={snows._id} snows={snows} deleteSnows={deleteSnows} updateSnow={updateSnow}></SingleSnowboardComponent>
            })}
            </div>
        </div>
    )
}

export default SnowboardContainer;