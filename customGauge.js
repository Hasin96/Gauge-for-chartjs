Chart.defaults.gauge = Chart.defaults.doughnut;

var gauge = Chart.controllers.doughnut.extend({
    draw: function(ease) {
        Chart.controllers.doughnut.prototype.draw.call(this, ease);
        var meta = this.getMeta();
        var pt0 = meta.data[0];

        var canvas = this.chart.canvas;
        var ctx = this.chart.chart.ctx;
        ctx.save();
        var cx = pt0._view.x;
        var cy = pt0._view.y;
        var innerRadius = pt0._view.innerRadius;
        var outerRadius = pt0._view.outerRadius;
        var config = this.chart.chart.config;
        var current = config.data.current;
        var max = config.data.max;
        var min = config.data.min;
        var radianAngle = Math.PI * (current - min) / (max - min) + Math.PI;

        // values
        var maxAmount = config.data.maxAmount;
        var currentAmount = config.data.currentAmount;
        var targetAmount = config.data.targetAmount;
        var targetPercentage = config.data.targetPercentage;
        var performanceToTargetCompletePercentage = config.data.percentCompleteToTarget.toFixed(0) + "%";
        console.log(maxAmount);
        console.log(currentAmount);
        console.log(targetAmount);
        console.log(targetPercentage);
        console.log(performanceToTargetCompletePercentage);

        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 5;
        ctx.translate(cx, cy);
        // ctx.rotate(radianAngle);
        ctx.rotate(radianAngle);
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(outerRadius / 1.01, 0);
        ctx.lineTo(0, 15);
        ctx.fillStyle = '#fff';
        ctx.fill();
        //ctx.rotate(-radianAngle);
        ctx.rotate(-radianAngle);
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        // ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.arc(cx, cy, 15, 0, Math.PI * 2)
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.save();

        ctx.translate(cx, cy);
        ctx.translate(-outerRadius, 20);
        ctx.textAlign = 'center';
        ctx.font = '1.2rem Segoe UI';
        ctx.fillStyle = '#000';
        ctx.fillText('0', 0, 0);
        ctx.translate(outerRadius, -20);
        ctx.translate(-cx, -cy);
        ctx.save();

        ctx.translate(cx, cy);
        ctx.translate(outerRadius, 20);
        ctx.textAlign = 'center';
        ctx.font = '1.2rem Segoe UI';
        ctx.fillStyle = '#000';
        ctx.fillText(maxAmount, 0, 0);
        ctx.translate(-outerRadius, -20);
        ctx.translate(-cx, -cy);
        ctx.save();

        // current amount
        ctx.translate(cx, cy);
        ctx.translate(0, -outerRadius - 20);
        ctx.textAlign = 'center';
        ctx.font = 'normal 2.8rem Segoe UI';
        ctx.fillStyle = '#000';
        ctx.fillText(currentAmount, 0, 0);
        ctx.translate(0, outerRadius + 20);
        ctx.translate(-cx, -cy);
        ctx.save();

        // target amount
        ctx.translate(cx, cy);
        ctx.rotate(Math.PI * (targetPercentage - min) / (max - min) + Math.PI);
        ctx.translate(outerRadius + 30, 0);
        ctx.font = 'normal 1.2rem Segoe UI';
        ctx.fillText(targetAmount, 0, 0);
        ctx.translate(-outerRadius - 30, 0);
        ctx.rotate(-(Math.PI * (targetPercentage - min) / (max - min) + Math.PI));
        ctx.translate(-cx, -cy);
        ctx.save();

        // ctx.translate(cx, cy);
        // ctx.translate(0, 50);
        // ctx.arc(0, 0, 10, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.translate(0, -50);
        // ctx.translate(-cx, -cy);
        // percentage 
        ctx.translate(cx, cy);
        ctx.translate(0, 50);
        ctx.font = 'normal 1.2rem Segoe UI';
        ctx.fillText(performanceToTargetCompletePercentage, 0, 0);
        ctx.translate(0, -50);
        ctx.translate(-cx, -cy);
        ctx.save();
    },
    initialize: function(chart, datasetIndex) {
        Chart.controllers.doughnut.prototype.initialize.call(this, chart, datasetIndex);
    }
});

Chart.controllers.gauge = gauge;

function drawNeedle(radius, radianAngle) {
    var canvas = document.getElementById("chart-speed");
    var needleCanvas = document.getElementById("pie");
    var ctx = needleCanvas.getContext('2d');
    // Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 5;
    var cw = canvas.offsetWidth;
    var ch = canvas.offsetHeight;
    var cx = cw / 2;
    var cy = ch;
    var current = 62.25;
    var min = 0;
    var max = 100;
    ctx.translate(cx, cy);
    // ctx.rotate(radianAngle);
    ctx.rotate(Math.PI * (current - min) / (max - min) + Math.PI);
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(radius / 1.01, 0);
    ctx.lineTo(0, 15);
    ctx.fillStyle = '#fff';
    ctx.fill();
    //ctx.rotate(-radianAngle);
    ctx.rotate(-(Math.PI * (current - min) / (max - min) + Math.PI));
    ctx.translate(-cx, -cy);
    ctx.beginPath();
    // ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.arc(cx, cy, 15, 0, Math.PI * 2)
    ctx.fill();
    ctx.shadowBlur = 0;
}