import { useState, useEffect, useContext } from 'react';
import Nav from '../Nav';
import NewLocationComponent from './NewLocationContainer.jsx/NewLocationContainer';
import SingleLocationComponent from './SingleLocationContainer/SingleLocationContainer';
import LocationContext from '../LocationContext';

const LocationsContainer = () => {
    const {locations, setLocations} = useContext(LocationContext)
    const [newLocationServerError, setNewLocationServerError] = useState("")
    const createNewLocation = async (newLocation) => {
        try {
            const apiResponse = await fetch("https://project5-backend.herokuapp.com/locations/", {
                method: "POST",
                body: JSON.stringify(newLocation),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json()
            console.log(parsedResponse)
            if (parsedResponse.success) {
                setLocations([parsedResponse.data, ...locations])
            } else {
                setNewLocationServerError(parsedResponse)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const deleteLocation = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`https://project5-backend.herokuapp.com/locations/${idToDelete}`, {
                method: "DELETE"
            })
            if (apiResponse.ok === true) {
                const newLocations = locations.filter(location => location._id !== idToDelete)
                setLocations(newLocations)
            } else {

            }
        } catch (err) {
            console.log(err)
        }
        console.log("deleting location ID" + idToDelete)
    }
    const getLocations = async () => {
        try {
            const locations = await fetch('https://project5-backend.herokuapp.com/locations/')
            const parsedLocations = await locations.json();
            setLocations(parsedLocations.data)
        } catch (err) {
            console.log(err)
        }
    }
    const updateLocation = async (idToUpdate, locationToUpdate) => {
        try {
            const apiResponse = await fetch(`https://project5-backend.herokuapp.com/locations/${idToUpdate}`, {
                method: "PUT",
                body: JSON.stringify(locationToUpdate),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if (parsedResponse.success) {
                const newLocations = locations.map(location => location._id === idToUpdate ? locationToUpdate : location)
                setLocations(newLocations)
            } else {

            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getLocations()
    }, [])
    return (
        <div className="container-div">
            <div className="display-div">
                <NewLocationComponent
                    newLocationServerError={newLocationServerError}
                    createNewLocation={createNewLocation}></NewLocationComponent>
                {locations.length > 0 ? locations.reverse().map((location) => {
                    return <SingleLocationComponent key={location._id}  location={location} deleteLocation={deleteLocation} updateLocation={updateLocation}></SingleLocationComponent>
                }) : null}
            </div>
       </div>
    )
}


export default LocationsContainer;