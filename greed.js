var Greed = function()
{
    var canvas,
        ctx,
        max = 3000;

    this.lastsize = 0;

    return {
        createCanvas: function()
        {
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');

            document.body.appendChild(canvas);

            canvas.height = max;
            canvas.width = max;
            canvas.style.position = 'absolute';
            canvas.style.right = 0;
            canvas.style.bottom = 0;
            canvas.style.pointerEvents = 'none';
        },

        refresh: function(config)
        {
            canvas || this.createCanvas();

            config = config || {};
            
            var // Params
                size = Math.max(1, parseInt(config.size)) || 18,
                opacity = Math.max(0, config.opacity) || 1,
                top = config.top || 0,
                left = config.left || 0,
                
                // Computed
                shift = size+1;
            
            canvas.style.top = (top-shift)+'px';
            canvas.style.left = (left-shift)+'px';
            canvas.style.opacity = opacity;
            
            if (this.lastsize != size)
            {
                this.lastsize = size;

                ctx.fillStyle = '#000';
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (var i = .5; i < max; i = i+size)
                {
                    ctx.beginPath();
                    ctx.moveTo(i, 0); 
                    ctx.lineTo(i, max);
                    ctx.stroke();
                    ctx.closePath();
                
                    ctx.beginPath();
                    ctx.moveTo(0, i); 
                    ctx.lineTo(max, i);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        },

        show: function()
        {
            if (!canvas) return;
            canvas.style.display = 'block';
        },

        hide: function()
        {
            if (!canvas) return;
            canvas.style.display = 'none';
        }
    };
};

