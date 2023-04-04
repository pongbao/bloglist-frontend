import PropTypes from "prop-types";

const Notification = ({ message, isError }) => {
  const notifStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  if (isError === true) {
    const errorStyle = {
      ...notifStyle,
      color: "red",
    };
    return (
      <div className="error" style={errorStyle}>
        {message}
      </div>
    );
  }

  return <div style={notifStyle}>{message}</div>;
};

Notification.propTypes = {
  isError: PropTypes.bool.isRequired,
};

export default Notification;
