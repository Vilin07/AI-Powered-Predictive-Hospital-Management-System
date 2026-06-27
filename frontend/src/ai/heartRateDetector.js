let greenSignal = [];

export const extractHeartRateSignal = (
video,
landmarks
) => {
if (!video || !landmarks?.length) return null;

const canvas =
document.createElement("canvas");

const ctx =
canvas.getContext("2d");

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

ctx.drawImage(
video,
0,
0,
canvas.width,
canvas.height
);

// Forehead ROI using multiple landmarks

const leftForehead = landmarks[67];
const rightForehead = landmarks[297];
const centerForehead = landmarks[10];

const x =
((leftForehead.x + rightForehead.x) / 2) *
canvas.width;

const y =
centerForehead.y *
canvas.height;

const width = 70;
const height = 40;

const imageData = ctx.getImageData(
x - width / 2,
y - height / 2,
width,
height
);
const pixels = imageData.data;

let green = 0;

for (
let i = 0;
i < pixels.length;
i += 4
) {
green += pixels[i + 1];
}

green =
green / (pixels.length / 4);

greenSignal.push({
    value: green,
    time: performance.now()
});

// Keep last 30 seconds @10fps
if (greenSignal.length > 300) {
greenSignal.shift();
}

return greenSignal;
};

export const estimateHeartRate = (signal) => {

    if (!signal || signal.length < 120)
        return 0;

    const values =
        signal.map(s => s.value);

    const mean =
        values.reduce((a,b)=>a+b,0) /
        values.length;

    const normalized =
        values.map(v=>v-mean);

    const filtered=[];

    for(let i=2;i<normalized.length-2;i++){

        filtered.push(

            (
                normalized[i-2]+
                normalized[i-1]+
                normalized[i]+
                normalized[i+1]+
                normalized[i+2]

            )/5

        );

    }

    let peaks=0;

    let lastPeak=-20;

    const max=Math.max(...filtered);

    const threshold=max*0.5;

    for(let i=1;i<filtered.length-1;i++){

        if(

            filtered[i]>filtered[i-1] &&
            filtered[i]>filtered[i+1] &&
            filtered[i]>threshold &&
            i-lastPeak>5

        ){

            peaks++;

            lastPeak=i;

        }

    }

    const duration=

        (
            signal[signal.length-1].time-
            signal[0].time

        )/1000;

    if(duration<=0)
        return 0;

    const bpm=
        (peaks*60)/duration;

    console.log(

        "Peaks:",
        peaks,

        "Duration:",
        duration,

        "BPM:",
        bpm

    );

    return Math.round(bpm);

};