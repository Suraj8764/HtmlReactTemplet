import React, { useState, useEffect } from "react";
import product from "./product"; 
import {
  Card,
  Button,
  Accordion,
  useAccordionButton,
  Row,
  Col,
} from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import {
  FaArrowRight,
  FaTruckMoving,
  FaInfoCircle,
  FaHome,
} from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import "./MoveList.css";

const CustomToggle = ({ children, eventKey, callback, variant, className }) => {
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );
  return (
    <Button
      variant={variant || "link"}
      onClick={decoratedOnClick}
      className={className}
    >
      {children}
    </Button>
  );
};

const MoveList = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [roomKeys, setRoomKeys] = useState({});

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleRoomToggle = (roomIndex) => {
    setRoomKeys((prevKeys) => ({
      ...prevKeys,
      [roomIndex]: prevKeys[roomIndex] ? null : roomIndex,
    }));
  };

  return (
    <div className="move-list">
      <Card key={product.estimate_id} className="mb-3">
        <Card.Header>
          <Row>
            <Col xs={6} md={3}>
              <p>
                <strong>From:</strong>
                <br /> {product.moving_from}
              </p>
            </Col>

            <Col
              xs={6}
              md={3}
              className="d-flex align-items-center justify-content-center"
              style={{
                opacity: 0.5,
                zIndex: 1,
                background: "white",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                margin: "0 40px",
              }}
            >
              <FaArrowRight
                className="text-danger"
                style={{ fontSize: "21px" }}
              />
            </Col>

            <Col xs={6} md={3}>
              <p>
                <strong>To:</strong>
                <br /> {product.moving_to}
              </p>
            </Col>

            <Col xs={6} md={3}>
              <p>
                <strong>Request#:</strong>
                <br />
                <span className="text-danger">{product.estimate_id}</span>
              </p>
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col
              xs={12}
              className="d-flex justify-content-start my-3 flex-wrap"
            >
              <div className="d-flex align-items-center me-3">
                <FaHome className="me-1 text-danger" />
                <span>{product.property_size}</span>
              </div>
              <div className="d-flex align-items-center me-3">
                <FaTruckMoving className="me-1 text-danger" />
                <span>{product.distance}</span>
              </div>
              <div className="d-flex align-items-center me-3">
                <strong>Packing Service:</strong>
                {product.packing_service ? (
                  <MdOutlineVerified color="green" className="ms-1" />
                ) : (
                  <FaInfoCircle color="red" className="ms-1" />
                )}
              </div>
              <div className="d-flex align-items-center">
                <strong>Unpacking Service:</strong>
                {product.unpacking_service ? (
                  <MdOutlineVerified color="green" className="ms-1" />
                ) : (
                  <FaInfoCircle color="red" className="ms-1" />
                )}
              </div>
            </Col>
          </Row>
          <IoIosWarning style={{ color: "red" }} />
          {""}
          <strong style={{ fontSize: "12px", marginTop: "12px" }}>
            {" "}
            Disclaimer:{" "}
          </strong>
          <span style={{ fontSize: "12px" }}>
            please update your move date before two days of shifting
          </span>

          <Row className="mt-3">
            <Col
              xs={12}
              className="d-flex justify-content-end align-items-center"
            >
              <CustomToggle
                eventKey="0"
                callback={() => handleToggle("0")}
                variant="outline-primary"
              >
                View move details
              </CustomToggle>
              <Button variant="outline-danger" className="ms-3">
                Quotes Awaiting
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Accordion activeKey={activeKey} onSelect={handleToggle}>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <h5>Inventory Details</h5>
              {product.items && product.items.rooms ? (
                product.items.rooms.map((room, roomIndex) => (
                  <Accordion key={roomIndex} activeKey={roomKeys[roomIndex]}>
                    <Card>
                      <Card.Header>
                        <div className="d-flex justify-content-between align-items-center">
                          <CustomToggle
                            eventKey={roomIndex}
                            callback={() => handleRoomToggle(roomIndex)}
                            className="custom-toggle font-weight-bold text-danger"
                          >
                           <span style={{fontWeight:"bold"}}>{room.roomName}</span> 
                          </CustomToggle>
                          {roomKeys[roomIndex] ? (
                            <FaAngleUp className="text-right text-danger" />
                          ) : (
                            <FaAngleDown className="text-right text-danger" />
                          )}
                        </div>
                      </Card.Header>
                      <Accordion.Collapse eventKey={roomIndex}>
                        <Card.Body>
                          <Row>
                            {room.categories ? (
                              room.categories.map((category, categoryIndex) => (
                                <Col
                                  key={categoryIndex}
                                  md={4}
                                  className="category"
                                >
                                  <h6 className="no-underline font-weight-bold text-danger">
                                    {category.categoryName}
                                  </h6>
                                  <ul className="category-list">
                                    {category.itemsList &&
                                    category.itemsList.all ? (
                                      category.itemsList.all.map(
                                        (item, itemIndex) => (
                                          <li
                                            key={itemIndex}
                                            className="font-weight-bold text-danger"
                                          >
                                            <span>{item.display_name}</span>
                                            <span>{item.qty}</span>
                                          </li>
                                        )
                                      )
                                    ) : (
                                      <li className="font-weight-bold text-danger">
                                        No items listed
                                      </li>
                                    )}
                                  </ul>
                                </Col>
                              ))
                            ) : (
                              <p className="font-weight-bold text-danger">
                                No categories available
                              </p>
                            )}
                          </Row>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                ))
              ) : (
                <p>No rooms available</p>
              )}
              <h5>House Details</h5>
              <div className="house-details">
                <div>
                  <div className="house-details-header">
                    Existing House Details
                  </div>
                  <div className="house-detail-row d-flex">
                    <p className="me-3">
                      <strong>Floor No.</strong> <br></br>
                      {product.old_floor_no}
                    </p>
                    <p className="me-3">
                      <strong>Elevator Available</strong>
                      <br></br> {product.old_elevator_availability}
                    </p>
                    <p className="me-3">
                      <strong>Packing Required</strong>
                      <br></br> {product.packing_service ? "Yes" : "No"}
                    </p>
                    <p className="me-3">
                      <strong>Distance from truck to door</strong>
                      <br></br> {product.old_parking_distance}
                    </p>
                    <p className="me-3">
                      <strong>Additional Information</strong>
                      <br></br> {product.new_parking_distance ? "yes" : "No"}{" "}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="house-details-header">New House Details</div>
                  <div className="house-detail-row d-flex">
                    <p className="me-3">
                      <strong>Floor No.</strong>
                      <br></br>
                      <span>{product.new_floor_no}</span>{" "}
                    </p>
                    <p className="me-3">
                      <strong>Elevator Available</strong>
                      <br></br> {product.new_elevator_availability}
                    </p>
                    <p className="me-3">
                      <strong>Packing Required</strong>
                      <br></br> {product.packing_service ? "Yes" : "No"}
                    </p>
                    <p className="me-3">
                      <strong>Distance from truck to door</strong>
                      <br></br> {product.new_parking_distance}{" "}
                    </p>
                    <p className="me-3">
                      <strong>Additional Information</strong>
                      <br></br> {product.new_parking_distance ? "yes" : "No"}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Card>
    </div>
  );
};

export default MoveList;
