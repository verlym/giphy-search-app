import React from 'react';
import { Card } from 'antd';

const GifItem = ({gif, onGifSelect}) => {
    return (
        <Card>
        <div className="gif-item" onClick={() => onGifSelect(gif)}>
            <img src={gif.images.downsized.url} alt="" />
        </div>
        </Card>
    )
};

export default GifItem;