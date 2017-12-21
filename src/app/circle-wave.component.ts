import { Component, ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'circle-wave',
    template: `<svg width="960" height="500"></svg>`
})
export class CircleWaveComponent implements AfterViewInit, OnDestroy {
    private parentElementRef: any;
    private d3Svg: d3.Selection<SVGSVGElement, any, null, undefined>;
    private timer: d3.Timer;

    constructor(element: ElementRef, private ngZone: NgZone) {
        this.parentElementRef = element.nativeElement;
    }

    ngAfterViewInit() {
        let d3ParentElement = d3.select(this.parentElementRef);
        let d3Svg = this.d3Svg = d3ParentElement.select('svg');
        let width = +d3Svg.attr('width');
        let height = +d3Svg.attr('height');
        let angles = d3.range(0, 2 * Math.PI, Math.PI / 200);

        let path = d3Svg.append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`)
            .attr('fill', 'none')
            .attr('stroke-width', 10)
            .attr('stroke-linejoin', 'round')
          .selectAll('path')
          .data(['cyan', 'magenta', 'yellow'])
          .enter().append('path')
            .attr('stroke', (d) => d)
            .style('mix-blend-mode', 'darken')
            .datum(function (d, i) {
                return d3.radialLine()
                    .curve(d3.curveLinearClosed)
                    .angle(function (a: any) { return a; })
                    .radius(function(a: any) {
                        let t = d3.now() / 1000;
                        return 200 + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * 32;
                    });
            });
        
        this.ngZone.runOutsideAngular(() => {
            this.timer = d3.timer(function () {
                path.attr('d', (d: any) => {
                    return d(angles)
                });
            });
        });
    }

    ngOnDestroy() {
        if (this.d3Svg.empty && !this.d3Svg.empty()) {
            this.d3Svg.selectAll('*').remove();
        }

        this.ngZone.runOutsideAngular(() => {
            this.timer.stop();
        });
    }
}