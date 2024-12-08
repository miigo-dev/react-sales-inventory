import '../css/sales.css';
import T1 from '../assets/icons/t1.svg';
import T2 from '../assets/icons/t2.svg';
import T3 from '../assets/icons/t3.svg';
import T4 from '../assets/icons/t4.svg';
import T5 from '../assets/icons/t5.svg';
import T6 from '../assets/icons/t6.svg';
import T7 from '../assets/icons/t7.svg';
import T8 from '../assets/icons/t8.svg';
import { useState, useEffect, useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { DataGrid } from '@mui/x-data-grid';

const Sales = () => {
    const [timeFrame, setTimeFrame] = useState('Today');
    const [isLakbayKape, setIsLakbayKape] = useState(false);
    const [showAllData, setShowAllData] = useState(false); // New state for showing all data
    
    const [salesTotals, setSalesTotals] = useState({
        Today: 0,
        Weekly: 0,
        Monthly: 0,
        Yearly: 0,
    });

    const toggleView = () => {
        setIsLakbayKape(prev => !prev);
    };

    const getSalesData = (frame) => {
        const kapeSalesData = {
            Today: { labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM'], data: [12, 19, 3, 5, 2] },
            Weekly: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [50, 100, 75, 125] },
            Monthly: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [200, 300, 250, 400] },
            Yearly: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], data: [1200, 1500, 1300, 1600, 2000, 1800, 2200, 2400, 2600, 3000, 3200, 3500] }
        };
    
        const kainSalesData = {
            Today: { labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM'], data: [8, 14, 7, 10, 6] },
            Weekly: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [30, 70, 50, 110] },
            Monthly: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [180, 270, 230, 350] },
            Yearly: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], data: [1100, 1300, 1150, 1500, 1800, 1700, 2100, 2300, 2500, 2800, 3000, 3300] }
        };
    
        return isLakbayKape ? kapeSalesData[frame] : kainSalesData[frame];
    };
    

    const calculateTotalSales = (data) => {
        return data.reduce((total, value) => total + value, 0);
    };

    useEffect(() => {
        setSalesTotals({
            Today: calculateTotalSales(getSalesData('Today').data),
            Weekly: calculateTotalSales(getSalesData('Weekly').data),
            Monthly: calculateTotalSales(getSalesData('Monthly').data),
            Yearly: calculateTotalSales(getSalesData('Yearly').data),
        });
    }, []);

    const getTopSalesItems = (frame, isKape) => {
        const items = {
            Today: isKape ? [
                { img: T3, name: 'Brewed Coffee' },
                { img: T2, name: 'Matcha Latte' },
                { img: T1, name: 'Sakura Latte 1' },
            ] : [
                { img: T4, name: 'Beef Salpicao' },
                { img: T5, name: 'Beef Bulgogi' },
                { img: T6, name: 'Chicken Teriyaki' },
            ],
            Weekly: isKape ? [
                { img: T2, name: 'Matcha Latte' },
                { img: T1, name: 'Sakura Latte 1' },
                { img: T3, name: 'Brewed Coffee' },
            ] : [
                { img: T4, name: 'Beef Salpicao' },
                { img: T5, name: 'Beef Bulgogi' },
                { img: T7, name: 'Beef Padkrapao' },
            ],
            Monthly: isKape ? [
                { img: T1, name: 'Sakura Latte 1' },
                { img: T2, name: 'Matcha Latte' },
                { img: T3, name: 'Brewed Coffee' },
            ] : [
                { img: T6, name: 'Chicken Teriyaki' },
                { img: T4, name: 'Beef Salpicao' },
                { img: T8, name: 'Chicken Buttered' },
            ],
            Yearly: isKape ? [
                { img: T3, name: 'Brewed Coffee' },
                { img: T1, name: 'Sakura Latte 1' },
                { img: T2, name: 'Matcha Latte' },
            ] : [
                { img: T5, name: 'Beef Bulgogi' },
                { img: T6, name: 'Chicken Teriyaki' },
                { img: T4, name: 'Beef Salpicao' },
            ],
        };

        return items[frame];
    };

    const salesData = getSalesData(timeFrame);
    const totalSales = salesData.data.reduce((total, value) => total + value, 0);

    const salesGridData = [
        { id: 1, period: 'Today', amount: salesTotals.Today },
        { id: 2, period: 'Weekly', amount: salesTotals.Weekly },
        { id: 3, period: 'Monthly', amount: salesTotals.Monthly },
        { id: 4, period: 'Yearly', amount: salesTotals.Yearly },
    ];

    // Determine which sales grid data to display based on the state
    const displayedSalesGridData = showAllData ? salesGridData : salesGridData.filter(item => item.period === timeFrame);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'period', headerName: 'Period', width: 150 },
        { field: 'amount', headerName: 'Sales Amount (₱)', width: 180 },
    ];

    const productSalesData = {
        Today: [
            { name: 'Brewed Coffee', sales: 25, img: '/icons/brewed_coffee.svg' },
            { name: 'Matcha Latte', sales: 15, img: '/icons/matcha_latte.svg' },
            { name: 'Sakura Latte', sales: 20, img: '/icons/sakura_latte.svg' }
        ],
        Weekly: [
            { name: 'Brewed Coffee', sales: 100, img: '/icons/brewed_coffee.svg' },
            { name: 'Matcha Latte', sales: 120, img: '/icons/matcha_latte.svg' },
            { name: 'Sakura Latte', sales: 90, img: '/icons/sakura_latte.svg' }
        ],
        Monthly: [
            { name: 'Brewed Coffee', sales: 400, img: '/icons/brewed_coffee.svg' },
            { name: 'Matcha Latte', sales: 350, img: '/icons/matcha_latte.svg' },
            { name: 'Sakura Latte', sales: 300, img: '/icons/sakura_latte.svg' },
        ],
        Yearly: [
            { name: 'Brewed Coffee', sales: 400, img: '/icons/brewed_coffee.svg' },
            { name: 'Matcha Latte', sales: 350, img: '/icons/matcha_latte.svg' },
            { name: 'Sakura Latte', sales: 300, img: '/icons/sakura_latte.svg' }
        ]
    };

    const getBestSellers = (frame) => {
        const sales = productSalesData[frame];
        return sales.sort((a, b) => b.sales - a.sales).slice(0, 5); // Top 3 products
    };

    // Memoized best sellers for current timeframe
    const bestSellers = useMemo(() => getBestSellers(timeFrame), [timeFrame]);

    // Columns for the best seller data grid
    const bestSellerColumns = [
        { field: 'name', headerName: 'Product', width: 150 },
        { field: 'sales', headerName: 'Sales', width: 100 },
    ];




    useEffect(() => {
        const getSalesForPeriod = (period, isKape) => {
            const salesData = getSalesData(period); // Get sales data based on the period
            return calculateTotalSales(salesData.data); // Calculate total sales based on data
        };
    
        setSalesTotals({
            Today: getSalesForPeriod('Today', isLakbayKape),
            Weekly: getSalesForPeriod('Weekly', isLakbayKape),
            Monthly: getSalesForPeriod('Monthly', isLakbayKape),
            Yearly: getSalesForPeriod('Yearly', isLakbayKape),
        });
    }, [isLakbayKape]);  // Dependency on `isLakbayKape` to update when the toggle is changed
    return (
        <div className='damage_container'>
            <div className="content-wrapper">
                <div className="sales-timeframes">
                    <div className="toggle_header">   
                        <input type="checkbox" className='input_type' id="toggle" onChange={toggleView} />
                        <div className="display">
                            <label className='label_type' htmlFor="toggle">
                                <div className="circle">
                                    <span className="material-symbols-outlined food">restaurant</span>
                                    <span className="material-symbols-outlined coffee">local_cafe</span>
                                </div>
                            </label>
                            <span className="categ-txt">
                                {isLakbayKape ? 'Lakbay Kape' : 'Lakbay Kain'}
                            </span>
                        </div>
                    </div>

                    <div className="timeframe-options">
                        {['Today', 'Weekly', 'Monthly', 'Yearly'].map((frame) => (
                            <button 
                                key={frame} 
                                onClick={() => setTimeFrame(frame)} 
                                className={frame.toLowerCase()}
                            >
                                {`${frame} - ₱${salesTotals[frame]}`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="line-graph-container">
                    <h2>{timeFrame} Sales</h2>
                    <div className="line-graph">
                        <LineChart
                            data={salesData}
                            xField="labels"
                            yField="data"
                            series={[{ name: 'Sales', data: salesData.data, color: '#C2A790' }]}
                            height={400}
                        />
                    </div>
                </div>
            </div>

            <div className="sales-table">
                <h2 className='Sales-Total'>Sales Totals</h2>
                <button onClick={() => setShowAllData(prev => !prev)} className='show-all'>
                    {showAllData ? 'Show Current Period Data' : 'Show All Data'}
                </button>
                <h1></h1>
                <DataGrid
                    rows={displayedSalesGridData}  // Use the displayed data
                    columns={columns}
                    pageSize={4}
                    rowsPerPageOptions={[4]}
                    disableSelectionOnClick
                />
            </div>
                
            <div className="top-sales">
                <h2 className='Top'>Lakbay's Best Seller</h2>
                <div className="top-sales-list">
                    {getTopSalesItems(timeFrame, isLakbayKape).map((item, index) => (
                        <div key={index} className={`T${index + 1}`}>
                            <img src={item.img} alt={`Top Item ${index + 1}`} />
                            <p className='txt'>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Best Sellers Grid */}
            <div className="best-seller-table">
                    <h2>Top Best Sellers</h2>
                    <DataGrid
                        rows={bestSellers.map((item, idx) => ({ id: idx + 1, ...item }))} 
                        columns={bestSellerColumns} 
                        pageSize={3}
                        rowsPerPageOptions={[3, 5, 10]} 
                        pagination // Enable pagination
                        disableSelectionOnClick 
                    />
                </div>
        </div>
    );
};

export default Sales;