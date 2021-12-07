import React from 'react'
import { ArcherContainer, ArcherElement } from 'react-archer';

const rootStyle = { display: 'flex', justifyContent: 'center' };
const rowStyle = { margin: '200px 0', display: 'flex', justifyContent: 'space-between' };
const boxStyle = { padding: '10px', border: '1px solid black' };
const boxSytle3 = { padding: '10px', border: '1px solid black'  };


const ReactArcher = () => {
    return (
        <div style={{ height: '500px', margin: '50px' }}>
      <ArcherContainer noCurves  strokeColor="black">
        <div style={rootStyle}>
          <ArcherElement
            id="root"
            relations={[
              {
                targetId: 'element2',
                targetAnchor: 'top',
                sourceAnchor: 'bottom',
                style: { strokeDasharray: '5,5' },
              },
            ]}
          >
            <div style={boxStyle}>Root</div>
          </ArcherElement>
        </div>

        <div style={rowStyle}>
          <ArcherElement
            id="element2"
            relations={[
              {
                targetId: 'element3',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                style: { strokeColor: 'blue', strokeWidth: 1 },
                label: <div style={{ marginTop: '-20px' }}>Arrow 2</div>,
              },
              {
                targetId: 'element5',
                targetAnchor: 'top',
                sourceAnchor: 'bottom',
                style: { strokeColor: 'blue', strokeWidth: 1 },
                label: <div style={{ marginTop: '-20px' }}>Arrow 2</div>,
              },
            ]}
          >
            <div style={boxStyle}>Element 2</div>
          </ArcherElement>

          <ArcherElement id="element3">
            <div style={boxSytle3}>Element 3</div>
          </ArcherElement>
          <ArcherElement
            id="element4"
            relations={[
              {
                targetId: 'root',
                targetAnchor: 'right',
                sourceAnchor: 'left',
                label: 'Arrow 3',
              },
            ]}
          >
            <div style={boxStyle}>Element 4</div>
          </ArcherElement>
        </div>
        <ArcherElement id="element5">
            <div style={boxSytle3}>Element 5</div>
          </ArcherElement>
      </ArcherContainer>
    </div>
    )
}

export default ReactArcher
