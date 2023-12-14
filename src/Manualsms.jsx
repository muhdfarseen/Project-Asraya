import React, { useRef } from 'react';
import './AdminProfile.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { supabase } from './supabase/config';
import { useState} from 'react';
import axios from 'axios';



function Manualsms() {

    const componentpdf = useRef();
    const currentYear = new Date().getFullYear(); // Get the current year
    const [year, setYear] = useState(currentYear.toString()); // State to hold the entered year, initialized with the current year
    const [tableData, setTableData] = useState([]); // State to hold the table data for the specific year
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            // Truncate the entered year to 'year' precision
            const startOfYear = new Date(`${year}-01-01`);
            const endOfYear = new Date(`${year}-12-31`);
    
            const { data, error } = await supabase
                .from('Donor_Details')
                .select('*')
                .gte('Date', startOfYear.toISOString()) // Greater than or equal to start of the year
                .lte('Date', endOfYear.toISOString()) // Less than or equal to end of the year
                .order('Date'); // Sort the data by 'Date' column in ascending order
    
            if (error) throw error;
    
            setTableData(data);
        } catch (error) {
            //console.error('Error fetching data:', error);
        }
    };

    const handleLogout = () => {
   
    sessionStorage.removeItem('token');
    
    navigate('/');
    };

// Inside Manualsms function
const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState([]);
const [customMessage, setCustomMessage] = useState('');


const handleCheckboxChange = (event, phoneNumber) => {
    if (event.target.checked) {
      setSelectedPhoneNumbers((prevSelectedPhoneNumbers) => [
        ...prevSelectedPhoneNumbers,
        phoneNumber,
      ]);
    } else {
      setSelectedPhoneNumbers((prevSelectedPhoneNumbers) =>
        prevSelectedPhoneNumbers.filter((num) => num !== phoneNumber)
      );
    }
  };

// Inside Manualsms function

const handleSendSMS = async (e) => {
    e.preventDefault();
  
    const message = e.target.elements.message.value;
    if (!message) {
      alert('Please enter a message to send.');
      return;
    }
  
    setCustomMessage(message);
  
    if (selectedPhoneNumbers.length === 0) {
      alert('Please select at least one phone number to send the SMS.');
      return;
    }
  
    const donorNames = tableData.map((row) => row.Name);
  
    try {
      const response = await axios.post('http://localhost:3001/api/send-custom-sms', {
        message: customMessage,
        phoneNumbers: selectedPhoneNumbers,
        names: donorNames,
      });
  
      if (response.data.success) {
        setSelectedPhoneNumbers([]);
        alert('SMS sent successfully.'); // Show success message
      } else {
        alert('Failed to send SMS. Please try again later.'); // Show error message
      }
    } catch (error) {
      console.error('Error sending custom SMS:', error.message);
      alert('Failed to send SMS. Please try again later.'); // Show error message
    }
  };
  

  return (
    <div>
        <nav className='Navbar'>
            <div className='logontxt'>
                <img className='NavLogo' src="/Assets/LOGO.svg" alt="" />
                <b>Asraya</b>&nbsp;Charitable Society
            </div>
            <div>
            <NavLink to='/adminprofile' className="btn btn-sm btn-outline-secondary me-3">
                &lt; Go Back
            </NavLink>
            <button onClick={handleLogout} className="btn btn-sm btn-danger button">Log Out</button>
            </div>
        </nav>

        <div className='sectioncontainer'>

            <section className='sectionone'>
                <div className='container'>
                    <div className="card">

                        <div className="card-header cardtablehead">
                        <div className='yearhead'>
                            <h5 className='hfive'>Details of The Year</h5>
                            <form onSubmit={handleSearch}>
                                <div className='input-group '>
                                <input
                                    type='number'
                                    className='form-control year'
                                    placeholder='YYYY'
                                    id='yearInput'
                                    name='year'
                                    min='1900'
                                    max='2100'
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                                <button type='submit' className='btn btn-success'>
                                    Search
                                    <img src='/Assets/Search.svg' className='ms-2' alt='' width='15px' />
                                </button>
                                </div>
                            </form>
                        </div>
                        

                        </div>

                        <div className="card-body tablehyt">
                        
                    <div ref={componentpdf} className='componentpdf'> 

                        <table className="table table-hover table-bordered ">

                            <thead className='table-light' >
                                <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">Address</th>
                                <th scope="col">Remarks</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Select</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {tableData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.Date}</td>
                                    <td>{row.Name}</td>
                                    <td>{row.Phone_no}</td>
                                    <td>{row.Address}</td>
                                    <td>{row.Remark}</td>
                                    <td>{row.Amount}</td>
                                    <td>
                                        <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="Check"
                                        onChange={(e) => handleCheckboxChange(e, row.Phone_no)}
                                        />
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    
                            
                        </div>
                    </div>
                </div>
            </section>

            <section className='sectiontwo'>
            <div className='container'>
                    <div className="card">
                        <h5 className="card-header">Send Message</h5>
                        <div className="card-body">
                        
                            <form onSubmit={handleSendSMS}>

                            <div className="input-group mb-3">
                            <label type="text" className="form-control">
                                To change the name dynamically, use {"{name}"} in your message. <br />
                                <b>For example:</b> <br />
                                If the message is like - "Hello Ramu" <br />
                                You can write it as - Hello {"{name}"}
                            </label>
                            </div>

                                <div className="form-floating mb-3">
                                <textarea
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea2"
                                    name="message"
                                    style={{ height: "200px" }}
                                    value={customMessage} // Use the customMessage state here
                                    onChange={(e) => setCustomMessage(e.target.value)} // Update the customMessage state when the user types in the textarea
                                ></textarea>

                                
                                <label htmlFor="floatingTextarea2">Message Body</label>
                                </div>
                               

                                <div className="d-flex justify-content-end">
                                    <button type="reset" className="btn btn-outline-danger mx-2">Cancel</button>
                                    <button type="submit" className="btn btn-success">Send Message</button>
                                    
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>

            </section>
        </div>




    </div>
  )
}

export default Manualsms