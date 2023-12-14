import React, { useRef } from 'react';
import './AdminProfile.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { supabase } from './supabase/config';
import { useState} from 'react';
import { useReactToPrint } from 'react-to-print';

function AdminProfile() { 

    const componentpdf = useRef();
    const currentYear = new Date().getFullYear(); // Get the current year
    const [year, setYear] = useState(currentYear.toString()); // State to hold the entered year, initialized with the current year
    const [tableData, setTableData] = useState([]); // State to hold the table data for the specific year
    const navigate = useNavigate();

    const generatepdf = useReactToPrint({
        content : ()=> componentpdf.current,
        documentTitle : "Asraya Charitable Society Donors Details",
        // onAfterPrint : ()=>alert("data saved in pdf")
    })

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

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const address = formData.get('address');
        const date = formData.get('date');
        const remark = formData.get('remark');
        const amount = formData.get('amount');
      
        try {
          // Insert data into the Supabase table
          const { data, error } = await supabase.from('Donor_Details').insert([
            {Date: date,Name: name,Phone_no: phone,Address: address,Remark: remark,Amount: amount },
          ]);
      
          if (error) throw error;
      
          alert('Data inserted successfully', data);
          
          // Optionally, you can show a success message to the user here.
        } catch (error) {
          alert('Error inserting data:', error);
          // Optionally, you can show an error message to the user here.
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
          
            <NavLink to='/manualsms' className="btn btn-sm btn-light me-3">
                <img src="/Assets/sms.svg" className="me-2" width="15px" alt="" />
                Send Custom Messages
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
                                <div className='input-group'>
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

                        <button className="btn btn-oy" onClick={generatepdf}>
                            Download PDF
                            <img src="/Assets/Download.svg" className="ms-2" width="15px" alt="" />
                        </button>
                        

                        </div>

                        <div className="card-body tablehyt">
                        
                    <div ref={componentpdf} className='componentpdf'> 

                        
                    <div className='cenlgo'>
                        <img src="/Assets/Pdf_Header.svg" alt="PDF Header" />
                    </div>

                        

                        <table className="table table-hover table-bordered ">

                            <thead className='table-light' >
                                <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">Address</th>
                                <th scope="col">Remarks</th>
                                <th scope="col">Amount</th>
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
                        <h5 className="card-header">Add New Donation Details</h5>
                        <div className="card-body">
                        
                            <form onSubmit={handleSubmit}>

                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Name </label>
                                    <input type="text"
                                            className="form-control"
                                            placeholder="Enter Name"
                                            name="name"
                                            required       
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect02">Phone No </label>
                                    <input type="tel"
                                            className="form-control"
                                            placeholder="Enter Phone Number"
                                            pattern="[0-9]{10}"
                                            name="phone" 
                                            required        
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect02">Address </label>
                                    <input type="text"
                                            className="form-control"
                                            placeholder="Enter Address"
                                            name="address"           
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Date</label>
                                    <input type="Date"
                                            className="form-control"
                                            placeholder="Choose Date"
                                            name="date"  
                                            required      
                                    />
                                </div>
                                
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect02">Amount </label>
                                    <input type="text"
                                            className="form-control"
                                            placeholder="Enter Amount"
                                            name="amount" 
                                            required                                        
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect02">Remarks </label>
                                    <input type="text"
                                            className="form-control"
                                            placeholder="Remarks if any..."
                                            name="remark"       
                                    />
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button type="reset" className="btn btn-outline-danger mx-2">Cancel</button>
                                    <button type="submit" className="btn btn-success">Save Details</button>
                                    
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>

                    <div className='container mt-4'>
                    <div className="card">
                        <h5 className="card-header">For Advance Data Management</h5>
                        <div className="card-body">
                                <a href="https://supabase.com/dashboard/project/rtdhczyjpazzivukdrvj/editor/28555">
                                    <img src="/Assets/supabase.svg" width="200px" alt="" target="blank" />
                                </a>  
                        </div>
                    </div>
                    </div> 

            </section>

        </div>
    </div>
  )
}

export default AdminProfile