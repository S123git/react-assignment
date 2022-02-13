import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const filterData = () => {
    var input, filter, table, tr, i;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      if (tr[i].textContent.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }      
    }
  }

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get('http://localhost:8080/api',{
          mode: 'cors',
        });
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);
  // console.log(data.parsedData);
  return (
    <div className="App">
      <header className="App-header">
      {loading && <div>Loading....</div>}
      {!loading && (
      <>
      <div style={{width:"100%", padding: "20px"}}>
        <label>Filter: </label>
        <input type="text" name="filter" onKeyUp={filterData} id="filter" placeholder='Type the text for filter' style={{width: "50%", padding: "5px"}} />
      </div>
      <table border={1} name="userTable" id="userTable">
        <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>website</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
           {data.parsedData.map((val) => (
              <tr>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.username}</td>
                <td>{val.email}</td>
                <td>
                  City: {val.address.city} <br/>
                  street: {val.address.street} <br/>
                  Suit: {val.address.suit} <br/>
                  zipcode: {val.address.zipcode} <br/>
                  geoLat: {val.address.geo.lat} <br/>
                  geoLong: {val.address.geo.lng} <br/>
                </td>
                <td>{val.phone}</td>
                <td>{val.website}</td>
                <td>
                  Company Name: {val.company.name} <br />
                  CatchPhrase: {val.company.catchPhrase} <br />
                </td>
              </tr>
           ))}
           </tbody>
        </table>
        </>
      )}
      </header>
    </div>
  );
}

export default App;
