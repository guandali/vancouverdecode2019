import React, {PureComponent} from 'react';

export default class StopInfo extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.id}, ${info.state}`;
    console.log(info)

    return (
      <div>
        <div>
          {displayName} |{' '}
          {/* <a
            target="_new"
            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
          >
            Wikipedia
          </a> */}
        </div>
        {/* <img width={240} src={info.image} /> */}
      </div>
    );
  }
}