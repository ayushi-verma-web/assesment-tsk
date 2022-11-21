import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSpacexdata } from '../../redux/rocketApi';
import './landing.css';

function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpacexdata());
  }, []);
  const rocketData = useSelector((state) => state.rocket.rocketData);
  const [data, setData] = useState();
  const [copyOfData, setCopyOfData] = useState([]);
  const [selectItem, setSelectItem] = useState();

  useEffect(() => {
    setData(rocketData);
    setCopyOfData(rocketData);
  }, [rocketData]);

  const handleSearch = (item) => {
    const filterData = copyOfData?.filter((value) => value
      .rocket.rocket_name.toLowerCase().includes(item.toLowerCase()));
    setData(filterData);
  };

  const handleFilter = (item) => {
    setSelectItem(item);
    let filterData = [...rocketData];
    if (item === 'month') {
      const previousMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      filterData = copyOfData.filter((e) => Number(e.launch_date_utc.split('-')[1]) === previousMonth && Number(e.launch_date_utc.split('-')[0]) === currentYear);
    } else if (item === 'week') {
      // const today = new Date();
      const currentWeek = new Date().setDate(new Date().getDate() - 7);
      filterData = copyOfData
        .filter((e) => new Date(e.launch_date_utc) >= currentWeek
       && new Date(e.launch_date_utc) < new Date());
    } else if (item === 'year') {
      const currentYear = new Date().getFullYear();
      const previousYear = currentYear - 1;
      filterData = copyOfData.filter((e) => Number(e.launch_date_utc.split('-')[0]) === previousYear);
    } else if (item === 'success') {
      filterData = copyOfData?.filter((value) => value.launch_success);
    } else if (item === 'failure') {
      filterData = copyOfData?.filter((value) => !value.launch_success);
    } else if (item === 'upcoming') {
      filterData = copyOfData?.filter((value) => value.upcoming);
    }
    setData(filterData);
  };
  return (
    <div className="landing-page" style={{ padding: '50px 0px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-5">
            <div className="d-flex justify-content-between">
              <div className="search-input w-auto">
                <input
                  type="text"
                  placeholder="Search by Rocket name"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="filter-data">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => handleFilter(e.target.value)}
                  value={selectItem}
                >
                  <option value="nofilter">Filter By Launch Date</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="year">Last Year</option>
                  <option value="success">Launch Status success </option>
                  <option value="failure">Launch Status Failure </option>
                  <option value="upcoming">Is it Upcoming</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {data?.length > 0 ? (
            <>
              {data.map((el) => (
                <div
                  className="col-lg-3 mb-5 col-md-4 col-6"
                  key={`item${el.flight_number}${Math.random()}`}
                >
                  <Card className="p-2">
                    <Card.Img variant="top" style={{ height: '120px', margin: '0px auto', width: 'fit-content' }} src={el?.links?.mission_patch} />
                    <Card.Body>
                      <Card.Title>{el.mission_name}</Card.Title>
                      <Card.Text>
                        Rocket name:
                        {el.rocket.rocket_name}
                      </Card.Text>
                      <div className="bottom-text">
                        <p>{el.launch_date_utc}</p>
                        <p>
                          Upcoming:
                          {el.upcoming ? 'true' : 'false'}
                        </p>
                        <p>
                          Launch Status:
                          {' '}
                          {el.launch_success ? 'success' : 'Failure'}
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </>
          ) : (
            <div className="data-not-found p-5 mt-5 text-center">
              <h2>Data Not Found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Landing;
