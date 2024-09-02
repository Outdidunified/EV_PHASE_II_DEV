import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const Log = ({ userInfo, handleLogout }) => {
    // State to manage which table is currently visible
    const [visibleTable, setVisibleTable] = useState('allData');

    // Function to handle table visibility based on button clicks
    const handleTableVisibility = (table) => {
        setVisibleTable(table);
    };

    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <div className="container-fluid page-body-wrapper">
                <div style={{transition: 'width 0.25s ease, margin 0.25s ease', width: 'calc(100%)', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column'}}>
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Log</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button type="button" className="btn btn-success"  style={{marginBottom:'10px', marginRight:'10px'}}>Create</button> 
                                            <button type="button" className="btn btn-warning" style={{marginBottom:'10px', marginRight:'10px'}}>Assign to Reseller</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin">
                                                <div className="row">
                                                    <div className="col-4 col-xl-8">
                                                        <h4 className="card-title" style={{paddingTop:'10px'}}>List Of Log</h4>  
                                                    </div>
                                                    <div className="col-8 col-xl-4">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                                                <span className="input-group-text" id="search">
                                                                <i className="icon-search"></i>
                                                                </span>
                                                            </div>
                                                            <input type="text" className="form-control" placeholder="Search now" aria-label="search" aria-describedby="search" autoComplete="off"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 grid-margin">
                                                <div className="row justify-content-center">
                                                    <div className="col-12 col-xl-12 text-center">
                                                        <button type="button" className="btn btn-outline-primary btn-fw" style={{marginBottom:'10px', marginRight:'10px'}} onClick={() => handleTableVisibility('allData')}>All</button>
                                                        <button type="button" className="btn btn-outline-primary btn-fw" style={{marginBottom:'10px', marginRight:'10px'}} onClick={() => handleTableVisibility('heartbeat')}>Heartbeat</button>
                                                        <button type="button" className="btn btn-outline-primary btn-fw" style={{marginBottom:'10px', marginRight:'10px'}} onClick={() => handleTableVisibility('bootNotification')}>BootNotification</button> 
                                                        <button type="button" className="btn btn-outline-primary btn-fw" style={{marginBottom:'10px', marginRight:'10px'}} onClick={() => handleTableVisibility('statusNotification')}>StatusNotification</button> 
                                                        <button type="button" className="btn btn-outline-primary btn-fw" style={{marginBottom:'10px', marginRight:'10px'}} onClick={() => handleTableVisibility('startStop')}>Start/Stop</button> 
                                                        <button type="button" className="btn btn-outline-primary btn-fw" style={{marginBottom:'10px', marginRight:'10px'}} onClick={() => handleTableVisibility('meterValues')}>Meter/Values</button> 
                                                        <button type="button" className="btn btn-outline-primary btn-fw" style={{marginBottom:'10px', marginRight:'10px'}} onClick={() => handleTableVisibility('authorization')}>Authorization</button> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* All data */}
                                        {visibleTable === 'allData' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Sl.No</th>
                                                            <th>Charger ID</th>
                                                            <th>Charger Model</th>
                                                            <th>Charger Type</th>
                                                            <th>Max Current</th>
                                                            <th>Status</th>
                                                            <th>Option</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>1221</td>
                                                            <td>1</td>
                                                            <td>1221</td>
                                                            <td>1</td>
                                                            <td>1221</td>
                                                            <td>1</td> 
                                                        </tr>                                                           
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Heartbeat */}
                                        {visibleTable === 'heartbeat' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Sl.No</th>
                                                            <th>Heartbeat</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>1221</td>
                                                        </tr>                                                           
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* BootNotification */}
                                        {visibleTable === 'bootNotification' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Sl.No</th>
                                                            <th>BootNotification</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>1221</td>
                                                        </tr>                                                           
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* StatusNotification */}
                                        {visibleTable === 'statusNotification' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Sl.No</th>
                                                            <th>StatusNotification</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>1221</td>
                                                        </tr>                                                           
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Start/Stop */}
                                        {visibleTable === 'startStop' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Sl.No</th>
                                                            <th>Start/Stop</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>1221</td>
                                                        </tr>                                                           
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Meter/Values */}
                                        {visibleTable === 'meterValues' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Sl.No</th>
                                                            <th>Meter/Values</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>1221</td>
                                                        </tr>                                                           
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Authorization */}
                                        {visibleTable === 'authorization' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Sl.No</th>
                                                            <th>Authorization</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>1221</td>
                                                        </tr>                                                           
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Log;
