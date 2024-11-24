import React, { useState } from "react";
import { Rnd } from "react-rnd"; // Import Rnd for drag & resize
import "./FaceBuilder.css";

const FaceBuilder = ({ features }) => {
  const [selectedCategory, setSelectedCategory] = useState("head");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Add a selected feature to the sketch area
  const handleFeatureSelect = (feature) => {
    setSelectedFeatures((prevState) => [
      ...prevState,
      { id: Date.now(), src: feature, x: 50, y: 50, width: 200, height: 200, opacity: 1, blendMode: "normal" },
    ]);
  };

  // Handle changing the active category
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="face-builder-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        {Object.keys(features).map((category) => (
          <div
            key={category}
            className={`sidebar-item ${selectedCategory === category ? "active" : ""}`}
            onClick={() => handleCategorySelect(category)}
          >
            <img
              src={`/icons/${category}.png`} // Replace with your icons folder path
              alt={category}
              className="sidebar-icon"
            />
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* Sketch Area */}
      <div className="sketch-area">
        <h2>Sketch Area</h2>
        <div className="sketch-canvas">
          {selectedFeatures.map((feature) => (
            <Rnd
              key={feature.id}
              default={{
                x: feature.x,
                y: feature.y,
                width: feature.width,
                height: feature.height,
              }}
              bounds="parent" // Restrict movement within the parent (the canvas)
              lockAspectRatio={false} // Allow free resizing
              enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
              }}
              dragHandleClassName="draggable-feature" // Enable drag handle class
              onDragStop={(e, data) => {
                setSelectedFeatures((prevState) =>
                  prevState.map((item) =>
                    item.id === feature.id ? { ...item, x: data.x, y: data.y } : item
                  )
                );
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setSelectedFeatures((prevState) =>
                  prevState.map((item) =>
                    item.id === feature.id
                      ? {
                          ...item,
                          width: ref.offsetWidth,
                          height: ref.offsetHeight,
                          x: position.x,
                          y: position.y,
                        }
                      : item
                  )
                );
              }}
            >
              <img
                src={feature.src}
                alt="Selected Feature"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  opacity: feature.opacity,
                  mixBlendMode: feature.blendMode, // Apply blend mode
                }}
              />
            </Rnd>
          ))}
        </div>
      </div>

      {/* Right Feature Box */}
      <div className="feature-box">
        <div className="feature-box-header">
          <h3>{selectedCategory.toUpperCase()} SHAPES TO CHOOSE FROM</h3>
        </div>
        <div className="feature-options">
          {features[selectedCategory].map((feature, index) => (
            <div key={index} className="feature-item">
              <img
                src={feature}
                alt={`${selectedCategory} ${index}`}
                onClick={() => handleFeatureSelect(feature)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaceBuilder;
