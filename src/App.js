import React, { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: 'Delhi',
      destination : 'Mumbai',
      time: "18:00",
      fligt_plans : []
      };
      this.searchFlight = this.searchFlight.bind(this)
  }

  async searchFlight() {
    try {
      const input_time = this.state.time

      console.log(input_time)
      const depart_hours = input_time.split(':')[0]
      const depart_mins = input_time.split(':')[1]
      var depart_datetime = new Date()
      depart_datetime.setHours(depart_hours)
      depart_datetime.setMinutes(depart_mins)
      depart_datetime.setSeconds(0)
      depart_datetime.setMilliseconds(0)
      console.log(depart_datetime)
      depart_datetime = depart_datetime.getTime()

      console.log(depart_datetime)
      const url = 'http://localhost:8000/flight-plan/?departure_city=' + this.state.source + 
        '&arrival_city=' + this.state.destination + '&departure_time=' + depart_datetime
      const res = await fetch(url);
      const res_json = await res.json();
      const fligt_plans = res_json.data

      console.log(fligt_plans)
      console.log("api msg = ")
      console.log(res_json.msg)

      this.setState({
        fligt_plans: fligt_plans
      });
    } catch (e) {
      console.log("Exception occured, logs ...")
      console.log(e);
      this.setState({
        fligt_plans: []
      });
    }
  }

  renderItems = () => {
    const best_flight_plans = this.state.fligt_plans
    console.log("best_flight_plans = " + best_flight_plans.length)
    if (best_flight_plans.length === 0){
      return <div>Sorry!!! No flight available. Please try a different time</div>
    }
    return (<div>
      <div style= {{display: "flex", justifyContent: "space-between", width: "800px"}}>
        <h3 style= {{width: '200px', justifyContent: "left"}}>Flight Number</h3>
        <h3 style= {{width: '200px', justifyContent: "left"}}>From</h3>
        <h3 style= {{width: '200px', justifyContent: "left"}}>To</h3>
      </div>
      <hr></hr>
      {
        best_flight_plans.map((route, route_index) => (
          <div>
          {
            route.map((flight, flight_index)=> (
              <div style= {{display: "flex", justifyContent: "space-between", width: "800px"}}>
                  <div style= {{width: '200px', justifyContent: "left"}}>
                  {flight.number}
                  </div>
                  <div style= {{width: '200px', justifyContent: "left"}}>
                  {flight.departure_city} - {String(new Date(parseInt(flight.departure_time)).getHours()).padStart(2, '0')}:{String(new Date(parseInt(flight.departure_time)).getMinutes()).padStart(2, '0')} 
                  </div>
                  <div style= {{width: '200px', justifyContent: "left"}}>
                  {flight.arrival_city} - {String(new Date(parseInt(flight.arrival_time)).getHours()).padStart(2, '0')}:{String(new Date(parseInt(flight.arrival_time)).getMinutes()).padStart(2, '0')} 
                  </div>
              </div>
            ))
          }
          <hr></hr>
          </div>
        ))
      }
    </div>)
  };

  render() {
    return (
      <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                <div className="container" style= {{width: '500px'}}>
                  <h1 style= {{width: '800px', alignContent: 'centre'}}>AIR SEWA</h1>
                  <div style= {{display: "flex", justifyContent: "space-between", width: "800px"}}>
                    <div style= {{width: '200px', justifyContent: "left"}}>Source</div>
                    <div style= {{width: '200px', justifyContent: "left"}}>Destination</div>
                    <div style= {{width: '200px', justifyContent: "left"}}>Time</div>
                  </div>
                  <div style= {{display: "flex", justifyContent: "space-between", width: "800px"}}>
                    <input style= {{width: '200px', justifyContent: "left"}} type="text" onChange={(event) => {this.setState({source: event.target.value})}} defaultValue= {this.state.source} placeholder="Source"/>
                    <input style= {{width: '200px', justifyContent: "left"}} type="text" onChange={(event) => {this.setState({destination: event.target.value})}} defaultValue= {this.state.destination} placeholder="Destination"/>
                    <input style= {{width: '200px', justifyContent: "left"}} type="time" onChange={(event) => {this.setState({time: event.target.value})}} defaultValue= {this.state.time} placeholder="Time"/>
                  </div>
                  <br/>
                  <button onClick = {this.searchFlight}>Search</button>
                  <div>
                    {}
                  </div>
                </div>
                <h2>Best Flights for you</h2>
                <hr></hr>
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
  
export default App;