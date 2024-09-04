import React, { useState, useEffect, useRef} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles.css';

const Logs = () => {
    const [visibleTable, setVisibleTable] = useState('All');
    //const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const socketRef = useRef(null);

    // States for different types of messages
    const [allData, setAllData] = useState([]);
    const [heartbeatData, setHeartbeatData] = useState([]);
    const [bootNotificationData, setBootNotificationData] = useState([]);
    const [statusNotificationData, setStatusNotificationData] = useState([]);
    const [startStopData, setStartStopData] = useState([]);
    const [meterValuesData, setMeterValuesData] = useState([]);
    const [authorizationData, setAuthorizationData] = useState([]);

    useEffect(() => {
        if (!socketRef.current) {
            const newSocket = new WebSocket('ws://122.166.210.142:7002');

            newSocket.addEventListener('open', (event) => {
                console.log('WebSocket connection opened:', event);
            });

            newSocket.addEventListener('message', async(response) => {
                const parsedMessage = JSON.parse(response.data);
                 console.log('parsedMessage', parsedMessage);
                 await handleFrame(parsedMessage);
            });

            newSocket.addEventListener('close', (event) => {
                console.log('WebSocket connection closed:', event);
            });

            newSocket.addEventListener('error', (event) => {
                console.error('WebSocket error:', event);
            });

            socketRef.current = newSocket;
            setLoading(false);
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [socketRef]);

    async function handleFrame(parsedMessage){
        // Get current date and time
        const currentDateTime = new Date().toLocaleString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });

        // Include the timestamp in the parsed message
        const messageWithAllDataTimestamp = {
            DeviceID: parsedMessage.DeviceID,
            message: parsedMessage.message,
            dateTime: currentDateTime,
        };

        setAllData((prevData) => [...prevData, messageWithAllDataTimestamp]);

        // Include the timestamp in the parsed message
        const messageWithTimestamp = {
            ...parsedMessage,
            dateTime: currentDateTime
        };

        // Categorize and store messages based on their types
        switch (parsedMessage.message[2]) {
            case 'Heartbeat':
                setHeartbeatData(prevData => [...prevData, messageWithTimestamp]);
                break;
            case 'BootNotification':
                setBootNotificationData(prevData => [...prevData, messageWithTimestamp]);
                break;
            case 'StatusNotification':
                setStatusNotificationData(prevData => [...prevData, messageWithTimestamp]);
                break;
            case 'StartTransaction':
            case 'StopTransaction':
                setStartStopData(prevData => [...prevData, messageWithTimestamp]);
                break;
            case 'MeterValues':
                setMeterValuesData(prevData => [...prevData, messageWithTimestamp]);
                break;
            case 'Authorize':
                setAuthorizationData(prevData => [...prevData, messageWithTimestamp]);
                break;
            default:
                break;
        }
    }

    // Search data 
    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase();
        const filteredData = allData.filter((item) =>
            item.DeviceID.toUpperCase().includes(inputValue)
        );

        switch (visibleTable) {
            case 'All':
                setAllData(filteredData);
                break;
            case 'Heartbeat':
                setHeartbeatData(filteredData);
                break;
            case 'BootNotification':
                setBootNotificationData(filteredData);
                break;
            case 'StatusNotification':
                setStatusNotificationData(filteredData);
                break;
            case 'Start/Stop':
                setStartStopData(filteredData);
                break;
            case 'Meter/Values':
                setMeterValuesData(filteredData);
                break;
            case 'Authorization':
                setAuthorizationData(filteredData);
                break;
            default:
                break;
        }
    };


    // Handel visibility buttons
    const handleTableVisibility = (table) => {
        setVisibleTable(table);
    };
    const buttons = [
        { label: 'All', value: 'All' },
        { label: 'Heartbeat', value: 'Heartbeat' },
        { label: 'BootNotification', value: 'BootNotification' },
        { label: 'StatusNotification', value: 'StatusNotification' },
        { label: 'Start/Stop', value: 'Start/Stop' },
        { label: 'Meter/Values', value: 'Meter/Values' },
        { label: 'Authorization', value: 'Authorization' }
    ];

    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header/>
            <div className="container-fluid page-body-wrapper">
                <div style={{transition: 'width 0.25s ease, margin 0.25s ease', width: 'calc(100%)', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column'}}>
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin">
                                                <div className="row">
                                                    <div className="col-4 col-xl-8">
                                                    {/* <h4 className="card-title" style={{paddingTop:'10px'}}>EVSE Live Log</h4>  */}
                                                        {/* backgroundColor: "#28a745" */}
                                                        <div className="live-indicator" style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "red", color: "white", padding: "6px 10px", borderRadius: "15px",fontWeight: "bold", fontSize: "16px", cursor: "pointer",  width: "150px", height: "40px" }}>                                                            
                                                            <span className="live-dot" style={{ width: "12px", height: "12px", backgroundColor: "white", borderRadius: "50%", marginRight: "6px", animation: "pulse 0.2s infinite" }}></span><span className="live-text">EVSE Live Log</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-8 col-xl-4">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                                                <span className="input-group-text" id="search">
                                                                <i className="icon-search"></i>
                                                                </span>
                                                            </div>
                                                            <input type="text" className="form-control" placeholder="Search now" aria-label="search" aria-describedby="search" autoComplete="off" onChange={handleSearchInputChange}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 grid-margin">
                                                <div className="row justify-content-center">
                                                    <div className="col-12 col-xl-12 text-center">
                                                       {buttons.map(button => (
                                                            <button
                                                                key={button.value}
                                                                type="button"
                                                                className={`btn ${visibleTable === button.value ? 'btn-primary' : 'btn-outline-primary'} btn-fw`}
                                                                style={{ marginBottom: '10px', marginRight: '10px' }}
                                                                onClick={() => handleTableVisibility(button.value)}
                                                            >
                                                                {button.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* All */}
                                        {visibleTable === 'All' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr>
                                                            <th>Date/Time</th>
                                                            <th>Device ID</th>
                                                            <th>Message</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ textAlign: 'center' }}>
                                                        {loading ? (
                                                            <tr>
                                                                <td colSpan="3" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                            </tr>
                                                        ) : (
                                                            Array.isArray(allData) && allData.length > 0 ? (
                                                                allData.slice().reverse().map((allItem, index) => (
                                                                    <tr key={index}>
                                                                        <td>{allItem.dateTime || '-'}</td>
                                                                        <td>{allItem.DeviceID || '-'}</td>
                                                                        <td>
                                                                            {allItem.message ? (
                                                                                <textarea value={JSON.stringify(allItem.message)} readOnly rows="5" cols="150" />
                                                                            ) : (
                                                                                '-'
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="3" style={{ marginTop: '50px', textAlign: 'center' }}>No AllData found</td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                        {/* Heartbeat */}
                                        {visibleTable === 'Heartbeat' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Date/Time</th>
                                                            <th>Device ID</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        {loading ? (
                                                            <tr>
                                                                <td colSpan="2" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                            </tr>
                                                        ) : (
                                                            Array.isArray(heartbeatData) && heartbeatData.length > 0 ? (
                                                                heartbeatData.slice().reverse().map((heartbeatItem, index) => (
                                                                <tr key={index}>
                                                                    <td>{heartbeatItem.dateTime || '-'}</td>
                                                                    <td>{heartbeatItem.DeviceID || '-'}</td>
                                                                </tr>
                                                            ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="2" style={{ marginTop: '50px', textAlign: 'center' }}>No Heartbeat found</td>
                                                                </tr>
                                                            )
                                                        )}                                                         
                                                    </tbody>
                                                </table>
                                            </div>   
                                        )}

                                        {/* BootNotification */}
                                        {visibleTable === 'BootNotification' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Date/Time</th>
                                                            <th>Device ID</th>
                                                            <th>Charge Point Vendor</th>
                                                            <th>Charge Point Model</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        {loading ? (
                                                            <tr>
                                                                <td colSpan="4" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                            </tr>
                                                        ) : (
                                                            Array.isArray(bootNotificationData) && bootNotificationData.length > 0 ? (
                                                                bootNotificationData.slice().reverse().map((bootNotificationItem, index) => {
                                                                    // Extract nested properties from the message array
                                                                    const chargePointVendor = bootNotificationItem.message[3]?.chargePointVendor || '-';
                                                                    const chargePointModel = bootNotificationItem.message[3]?.chargePointModel || '-';
                                                            
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{bootNotificationItem.dateTime || '-'}</td> 
                                                                            <td>{bootNotificationItem.DeviceID || '-'}</td>
                                                                            <td>{chargePointVendor}</td> 
                                                                            <td>{chargePointModel}</td>   
                                                                        </tr>
                                                                    );
                                                                })
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="4" style={{ marginTop: '50px', textAlign: 'center' }}>No BootNotification found</td>
                                                                </tr>
                                                            )
                                                        )}                                                               
                                                    </tbody>
                                                </table>
                                            </div>    
                                        )}

                                        {/* StatusNotification */}
                                        {visibleTable === 'StatusNotification' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Date/Time</th>
                                                            <th>Device ID</th>
                                                            <th>Connector ID</th>
                                                            <th>Status</th>
                                                            <th>Error Code</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        {loading ? (
                                                            <tr>
                                                                <td colSpan="5" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                            </tr>
                                                        ) : (
                                                            Array.isArray(statusNotificationData) && statusNotificationData.length > 0 ? (
                                                                statusNotificationData.slice().reverse().map((statusNotificationItem, index) => {
                                                                    const getStatusStyle = (status) => {
                                                                        switch (status) {
                                                                        case 'Available':
                                                                            return { color: '#4B49AC' };
                                                                        case 'Preparing':
                                                                        case 'Charging':
                                                                            return { color: 'green' };
                                                                        case 'Finishing':
                                                                            return { color: '#ff28ec' };  
                                                                        default:
                                                                            return { color: 'red' };
                                                                        }
                                                                    };
                                                                    // Extract nested properties from the message array
                                                                    const connectorId = statusNotificationItem.message[3]?.connectorId || '-';
                                                                    const status = statusNotificationItem.message[3]?.status || '-';
                                                                    const errorCode = statusNotificationItem.message[3]?.errorCode || '-';

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{statusNotificationItem.dateTime || '-'}</td> 
                                                                            <td>{statusNotificationItem.DeviceID || '-'}</td>
                                                                            <td>{connectorId}</td> 
                                                                            <td style={getStatusStyle(status)}>{status}</td>  
                                                                            <td>{errorCode}</td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="5" style={{ marginTop: '50px', textAlign: 'center' }}>No StatusNotification found</td>
                                                                </tr>
                                                            )
                                                        )}                                                                
                                                    </tbody>
                                                </table>
                                            </div>    
                                        )}

                                        {/* Start/Stop */}
                                        {visibleTable === 'Start/Stop' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Date/Time</th>
                                                            <th>Device ID</th>
                                                            <th>Start Transaction /Stop Transaction</th>
                                                            <th>Connector ID</th>
                                                            <th>Tag ID</th>
                                                            <th>TransactionID</th>
                                                            <th>Reason</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                    {loading ? (
                                                            <tr>
                                                                <td colSpan="7" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                            </tr>
                                                        ) : (
                                                            Array.isArray(startStopData) && startStopData.length > 0 ? (
                                                                startStopData.slice().reverse().map((startStopItem, index) => {
                                                                    // Extract the type of transaction
                                                                    const transactionType = startStopItem.message[2];

                                                                    // Extract nested properties from the message array
                                                                    const meterStart = transactionType === 'StartTransaction' ? startStopItem.message[3]?.meterStart || '-' : '-';
                                                                    const meterStop = transactionType === 'StopTransaction' ? startStopItem.message[3]?.meterStop || '-' : '-';
                                                                    const connectorId = startStopItem.message[3]?.connectorId || '-';
                                                                    const idTag = startStopItem.message[3]?.idTag || '-';
                                                                    const transactionId = startStopItem.message[3]?.transactionId || '-';
                                                                    const reason = startStopItem.message[3]?.reason || '-';

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{startStopItem.dateTime || '-'}</td> 
                                                                            <td>{startStopItem.DeviceID || '-'}</td>
                                                                            <td>{transactionType === 'StartTransaction' ? meterStart : (transactionType === 'StopTransaction' ? meterStop : '-')}</td>
                                                                            <td>{connectorId}</td> 
                                                                            <td>{idTag}</td>   
                                                                            <td>{transactionId}</td>
                                                                            <td>{reason}</td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="7" style={{ marginTop: '50px', textAlign: 'center' }}>No Start/Stop found</td>
                                                                </tr>
                                                            )
                                                        )}                                                                
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Meter/Values */}
                                        {visibleTable === 'Meter/Values' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Date/Time</th>
                                                            <th>Device ID</th>
                                                            <th>Connector ID</th>
                                                            <th>TransactionID</th>
                                                            <th>Meter Values</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                    {loading ? (
                                                            <tr>
                                                                <td colSpan="5" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                            </tr>
                                                        ) : (
                                                            Array.isArray(meterValuesData) && meterValuesData.length > 0 ? (
                                                                meterValuesData.slice().reverse().map((meterValuesItem, index) => {
                                                                    // Extract nested properties from the message array
                                                                    const connectorId = meterValuesItem.message[3]?.connectorId || '-';
                                                                    const transactionId = meterValuesItem.message[3]?.transactionId || '-';
                                                                    // const meterValue = meterValuesItem.message[3]?.meterValue || '-';
                                                            
                                                                    // Format meter values
                                                                    const meterValues = meterValuesItem.message[3]?.meterValue || [];
                                                                    const sampledValues = meterValues[0]?.sampledValue || [];

                                                                    const formattedMeterValues = sampledValues.reduce((acc, { value, unit }) => {
                                                                        switch (unit) {
                                                                            case 'V':
                                                                                acc.voltage = `Voltage: ${value}`;
                                                                                break;
                                                                            case 'A':
                                                                                acc.current = `Current: ${value}`;
                                                                                break;
                                                                            case 'W':
                                                                                acc.power = `Power: ${value}`;
                                                                                break;
                                                                            case 'Wh':
                                                                                acc.energy = `Energy: ${value}`;
                                                                                break;
                                                                            default:
                                                                                break;
                                                                        }
                                                                        return acc;
                                                                    }, {});

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{meterValuesItem.dateTime || '-'}</td> 
                                                                            <td>{meterValuesItem.DeviceID || '-'}</td>
                                                                            <td>{connectorId}</td> 
                                                                            <td>{transactionId}</td>   
                                                                            <td>
                                                                                {formattedMeterValues.voltage || '-'}{', '}
                                                                                {formattedMeterValues.current || '-'}{', '}
                                                                                {formattedMeterValues.power || '-'}{', '}
                                                                                {formattedMeterValues.energy || '-'}
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="5" style={{ marginTop: '50px', textAlign: 'center' }}>No Meter/Values found</td>
                                                                </tr>
                                                            )
                                                        )}                                                                
                                                    </tbody>
                                                </table>
                                            </div>    
                                        )}

                                        {/* Authorization */}
                                        {visibleTable === 'Authorization' && (
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-striped">
                                                    <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                        <tr> 
                                                            <th>Date/Time</th>
                                                            <th>Device ID</th>
                                                            <th>Tag ID</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{textAlign:'center'}}>
                                                        {loading ? (
                                                            <tr>
                                                                <td colSpan="3" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                            </tr>
                                                        ) : (
                                                            Array.isArray(authorizationData) && authorizationData.length > 0 ? (
                                                                authorizationData.slice().reverse().map((authorizationItem, index) => {
                                                                    // Extract nested properties from the message array
                                                                    const idTag = authorizationItem.message[3]?.idTag || '-';
                                                                    
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{authorizationItem.dateTime || '-'}</td> 
                                                                            <td>{authorizationItem.DeviceID || '-'}</td>
                                                                            <td>{idTag}</td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="3" style={{ marginTop: '50px', textAlign: 'center' }}>No Authorization found</td>
                                                                </tr>
                                                            )
                                                        )}
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

export default Logs;
