import React from 'react';
import moment from 'moment';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment(props.from),
      selected: moment().startOf('day'),
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous() {
    const { month } = this.state;

    this.setState({
      month: month.subtract(1, 'month'),
    });
  }

  next() {
    const { month } = this.state;

    this.setState({
      month: month.add(1, 'month'),
    });
  }

  select(day) {
    this.setState({
      selected: day.date,
      month: day.date.clone(),
    });
  }

  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month
      .clone()
      .startOf('month')
      .add('w' - 1)
      .day('Sunday');
    let count = 0;
    let monthIndex = date.month();

    const { selected, month } = this.state;

    while (!done) {
      weeks.push(
        <Week
          confirmed={this.props.requests.confirmed}
          pending={this.props.requests.pending}
          key={date}
          date={date.clone()}
          month={month}
          select={(day) => this.select(day)}
          selected={selected}
        />
      );

      date.add(1, 'w');

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }

  renderMonthLabel() {
    const { month } = this.state;

    const d = new Date(month);

    const options = {
      month: 'long',
      year: 'numeric',
    };

    const fomatted = d.toLocaleDateString('nl-NL', options);

    return <span className="month-label">{fomatted}</span>;
  }

  render() {
    const showPrev =
      new Date(this.state.month).getMonth() !==
      new Date(this.props.from).getMonth();

    const showNext =
      new Date(this.state.month).getMonth() !==
      new Date(this.props.to).getMonth();

    return (
      <section className="calender  margin-t-m">
        <header className="calender-header">
          <div className="month-display row">
            {showPrev && (
              <span className="calender-arrow" onClick={this.previous}>
                &larr;
              </span>
            )}

            {this.renderMonthLabel()}
            {showNext && (
              <span className="calender-arrow" onClick={this.next}>
                &rarr;
              </span>
            )}
          </div>
          <DayNames />
        </header>
        {this.renderWeeks()}
      </section>
    );
  }
}

class DayNames extends React.Component {
  render() {
    return (
      <div className="row day-names">
        <span className="day">Zo</span>
        <span className="day">Ma</span>
        <span className="day">Di</span>
        <span className="day">Wo</span>
        <span className="day">Do</span>
        <span className="day">Vr</span>
        <span className="day">Za</span>
      </div>
    );
  }
}

class Week extends React.Component {
  render() {
    let days = [];
    let { date } = this.props;

    const { month, selected, select, confirmed, pending } = this.props;

    for (var i = 0; i < 7; i++) {
      let day = {
        name: date.format('dd').substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), 'day'),
        date: date,
      };
      days.push(
        <Day
          key={i}
          day={day}
          selected={selected}
          select={select}
          confirmed={confirmed}
          pending={pending}
        />
      );

      date = date.clone();
      date.add(1, 'day');
    }

    return (
      <div className="row week" key={days[0]}>
        {days}
      </div>
    );
  }
}

const normDate = (date) => {
  const dateParts = date.split('/');

  // month is 0-based, that's why we need dataParts[1] - 1
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
};

class Day extends React.Component {
  render() {
    const {
      day,
      day: { date, isCurrentMonth, isToday, number },
      select,
      selected,
      confirmed,
      pending,
    } = this.props;

    const disabled = confirmed.some((e) => {
      const normalDate = normDate(e);
      return normalDate.getTime() === new Date(date).getTime();
    });

    const isPending = pending.some((e) => {
      const normalDate = normDate(e);
      return normalDate.getTime() === new Date(date).getTime();
    });

    const className =
      'day ' +
      (isToday ? ' today ' : '') +
      (isCurrentMonth ? '' : ' different-month ') +
      (date.isSame(selected) ? ' selected ' : '') +
      (disabled ? ' disabled ' : '') +
      (isPending ? ' pending ' : '');

    return (
      <span
        key={date.toString()}
        className={className}
        // onClick={() => select(day)}
      >
        {number}
      </span>
    );
  }
}
