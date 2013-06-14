var Greed = function()
{
    var LOCALSTORAGEKEY = '__greed',

        canvas,
        ctx,
        max = 3000;

    this.size = 10;
    this.top = 0;
    this.left = 0;
    this.opacity = 100;
    this.visible = true;

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
            canvas.style.zIndex = 2147483647;
        },

        setConfig: function(config)
        {
            config = config || {};
            
            if (undefined !== config.size)
            {
                this.size = Math.max(1, parseInt(config.size));
            }

            if (undefined !== config.opacity)
            {
                this.opacity = Math.max(0, config.opacity);
            }

            if (undefined !== config.top)
            {
                this.top = config.top;
            }

            if (undefined !== config.left)
            {
                this.left = config.left;
            }

            if (undefined !== config.visible)
            {
                this.visible = config.visible;
            }

            // Save in localstorage
            localStorage.setItem(
                LOCALSTORAGEKEY,
                JSON.stringify({
                    size: this.size,
                    top: this.top,
                    left: this.left,
                    opacity: this.opacity,
                    visible: this.visible
                })
            );
        },

        refresh: function(config)
        {
            var prevsize = this.size,
                shift;

            config && this.setConfig(config);

            canvas || this.createCanvas();
            
            shift = this.size+1;
            
            canvas.style.top = (this.top-shift)+'px';
            canvas.style.left = (this.left-shift)+'px';
            canvas.style.opacity = this.opacity / 100;
            
            if (this.size != prevsize)
            {
                ctx.fillStyle = '#000';
                ctx.strokeStyle = '#000';
                ctx.lineWidth = .5;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (var i = .5; i < max; i = i+this.size)
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
            this.setConfig({
                visible: true
            });
        },

        hide: function()
        {
            if (!canvas) return;
            canvas.style.display = 'none';
            this.setConfig({
                visible: false
            });
        },

        getSavedParams: function()
        {
            var saved = localStorage.getItem(LOCALSTORAGEKEY);

            try
            {
                return JSON.parse(saved);
            }
            catch (e) {}

            return {
                size: this.size,
                top: this.top,
                left: this.left,
                opacity: this.opacity,
                visible: this.visible
            };
        }
    };
};

