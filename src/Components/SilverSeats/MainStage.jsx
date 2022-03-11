import React, { React, useState, useRef, useCallback, useEffect } from 'react';
import { Stage, Layer } from './react-konva';
import Section from './Section';
import SeatPopup from './SeatPopup';
import Button from '@mui/material/Button';
import * as layout from './layout';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);
  return data;
};

const MainStage = ({ data }) => {
  const jsonData = useFetch('./seats-data.json');
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [scaleToFit, setScaleToFit] = useState(1);
  const [size, setSize] = useState({
    width: '100%',
    height: '100%',
    virtualWidth: '100%',
  });
  const [virtualWidth, setVirtualWidth] = useState(700);

  const [selectedSeatsIds, setSelectedSeatsIds] = useState([]);

  const [popup, setPopup] = useState({ seat: null });

  // calculate available space for drawing
  useEffect(() => {
    const newSize = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    };
    if (newSize.width !== size.width || newSize.height !== size.height) {
      setSize(newSize);
    }
  });

  // calculate initial scale
  useEffect(() => {
    if (!stageRef.current) {
      return;
    }
    const stage = stageRef.current;
    const clientRect = stage.getClientRect({ skipTransform: true });

    const scaleToFit = size.width / clientRect.width;
    setScale(scaleToFit);
    setScaleToFit(scaleToFit);
    setVirtualWidth(clientRect.width);
  }, [data, size]); //jsonData

  // togle scale on double clicks or taps
  const toggleScale = useCallback(() => {
    if (scale === 1) {
      setScale(scaleToFit);
    } else {
      setScale(1);
    }
  }, [scale, scaleToFit]);

  let lastSectionPosition = 0;

  const handleHover = useCallback((seat, pos) => {
    setPopup({
      seat: seat,
      position: pos,
    });
  }, []);

  const handleSelect = useCallback(
    (seatId) => {
      const newIds = selectedSeatsIds.concat([seatId]);
      setSelectedSeatsIds(newIds);
    },
    [selectedSeatsIds]
  );

  const handleDeselect = useCallback(
    (seatId) => {
      const ids = selectedSeatsIds.slice();
      ids.splice(ids.indexOf(seatId), 1);
      setSelectedSeatsIds(ids);
    },
    [selectedSeatsIds]
  );

  /*if (jsonData === null) {
    return <div ref={containerRef}>Loading...</div>;
  }*/

  //jsonData.seats.sections
  const maxSectionWidth = layout.getMaximimSectionWidth(data.seats.sections);

  function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }
  // save as svg
  const saveAsImage = () => {
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, 'scheme.png');
  };

  // save as Json
  const saveAsJson = () => {
    var canvasContents = stageRef.current.toJSON();

    var file = new Blob([canvasContents], {
      type: 'application/json',
    });

    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'lightgrey',
        width: '80%',
        height: '500px',
        padding: 0,
      }}
      ref={containerRef}
    >
      <Button
        variant="contained"
        style={{ marginRight: '10px' }}
        onClick={saveAsImage}
      >
        Save as image
      </Button>
      <Button variant="contained" onClick={saveAsJson}>
        Save as Json
      </Button>
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        draggable
        dragBoundFunc={(pos) => {
          pos.x = Math.min(
            size.width / 2,
            Math.max(pos.x, -virtualWidth * scale + size.width / 2)
          );
          pos.y = Math.min(size.height / 2, Math.max(pos.y, -size.height / 2));
          return pos;
        }}
        onDblTap={toggleScale}
        onDblClick={toggleScale}
        scaleX={scale}
        scaleY={scale}
      >
        <Layer>
          {data.seats.sections.map((section, index) => {
            const height = layout.getSectionHeight(section);
            const position = lastSectionPosition + layout.SECTIONS_MARGIN;
            lastSectionPosition = position + height;
            const width = layout.getSectionWidth(section);

            const offset = (maxSectionWidth - width) / 2;

            return (
              <Section
                x={offset}
                y={position}
                height={height}
                key={index}
                section={section}
                selectedSeatsIds={selectedSeatsIds}
                onHoverSeat={handleHover}
                onSelectSeat={handleSelect}
                onDeselectSeat={handleDeselect}
              />
            );
          })}
        </Layer>
      </Stage>
      {/* draw popup as html */}
      {popup.seat && (
        <SeatPopup
          position={popup.position}
          seatId={popup.seat}
          onClose={() => {
            setPopup({ seat: null });
          }}
        />
      )}
    </div>
  );
};

export default MainStage;
