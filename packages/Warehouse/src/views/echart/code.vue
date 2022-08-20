<template>
  <div
    class="highlight highlight-text-html-vue notranslate position-relative overflow-auto markdown-body"
  >
    <pre>&lt;<span class="pl-ent">template</span>&gt;
  &lt;<span class="pl-ent">EChart</span> <span class="pl-e">EType</span>=<span class="pl-s"><span class="pl-pds">"</span>PieChart<span class="pl-pds">"</span></span> :<span class="pl-e">options</span>=<span class="pl-s1"><span class="pl-pds">"</span>options<span class="pl-pds">"</span></span> /&gt;
&lt;/<span class="pl-ent">template</span>&gt;

<span class="pl-s1">&lt;<span class="pl-ent">script</span>&gt;</span>
<span class="pl-s1"><span class="pl-k">import</span> { <span class="pl-smi">EChart</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">"</span>@alien/components<span class="pl-pds">"</span></span>;</span>
<span class="pl-s1"><span class="pl-k">import</span> { <span class="pl-smi">PieChart</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">"</span>echarts/charts<span class="pl-pds">"</span></span>;</span>
<span class="pl-s1"></span>
<span class="pl-s1"><span class="pl-k">export</span> <span class="pl-c1">default</span> <span class="pl-smi">defineComponent</span>({</span>
<span class="pl-s1">  name<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>HelloWorld<span class="pl-pds">"</span></span>,</span>
<span class="pl-s1">  components<span class="pl-k">:</span> {</span>
<span class="pl-s1">    EChart</span>
<span class="pl-s1">  },</span>
<span class="pl-s1">  <span class="pl-en">setup</span><span class="pl-k">:</span> () <span class="pl-k">=&gt;</span> {</span>
<span class="pl-s1">    <span class="pl-k">const</span> <span class="pl-c1">option</span> <span class="pl-k">=</span> <span class="pl-en">ref</span>({</span>
<span class="pl-s1">      title<span class="pl-k">:</span> {</span>
<span class="pl-s1">        text<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>Traffic Sources<span class="pl-pds">"</span></span>,</span>
<span class="pl-s1">        left<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>center<span class="pl-pds">"</span></span></span>
<span class="pl-s1">      },</span>
<span class="pl-s1">      tooltip<span class="pl-k">:</span> {</span>
<span class="pl-s1">        trigger<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>item<span class="pl-pds">"</span></span>,</span>
<span class="pl-s1">        formatter<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>{a} &lt;br/&gt;{b} : {c} ({d}%)<span class="pl-pds">"</span></span></span>
<span class="pl-s1">      },</span>
<span class="pl-s1">      legend<span class="pl-k">:</span> {</span>
<span class="pl-s1">        orient<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>vertical<span class="pl-pds">"</span></span>,</span>
<span class="pl-s1">        left<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>left<span class="pl-pds">"</span></span>,</span>
<span class="pl-s1">        data<span class="pl-k">:</span> [<span class="pl-s"><span class="pl-pds">"</span>Direct<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>Email<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>Ad Networks<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>Video Ads<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>Search Engines<span class="pl-pds">"</span></span>]</span>
<span class="pl-s1">      },</span>
<span class="pl-s1">      series<span class="pl-k">:</span> [</span>
<span class="pl-s1">        {</span>
<span class="pl-s1">          name<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>Traffic Sources<span class="pl-pds">"</span></span>,</span>
<span class="pl-s1">          type<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>pie<span class="pl-pds">"</span></span>,</span>
<span class="pl-s1">          radius<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>55%<span class="pl-pds">"</span></span>,</span>
<span class="pl-s1">          center<span class="pl-k">:</span> [<span class="pl-s"><span class="pl-pds">"</span>50%<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>60%<span class="pl-pds">"</span></span>],</span>
<span class="pl-s1">          data<span class="pl-k">:</span> [</span>
<span class="pl-s1">            { value<span class="pl-k">:</span> <span class="pl-c1">335</span>, name<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>Direct<span class="pl-pds">"</span></span> },</span>
<span class="pl-s1">            { value<span class="pl-k">:</span> <span class="pl-c1">310</span>, name<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>Email<span class="pl-pds">"</span></span> },</span>
<span class="pl-s1">            { value<span class="pl-k">:</span> <span class="pl-c1">234</span>, name<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>Ad Networks<span class="pl-pds">"</span></span> },</span>
<span class="pl-s1">            { value<span class="pl-k">:</span> <span class="pl-c1">135</span>, name<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>Video Ads<span class="pl-pds">"</span></span> },</span>
<span class="pl-s1">            { value<span class="pl-k">:</span> <span class="pl-c1">1548</span>, name<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>Search Engines<span class="pl-pds">"</span></span> }</span>
<span class="pl-s1">          ],</span>
<span class="pl-s1">          emphasis<span class="pl-k">:</span> {</span>
<span class="pl-s1">            itemStyle<span class="pl-k">:</span> {</span>
<span class="pl-s1">              shadowBlur<span class="pl-k">:</span> <span class="pl-c1">10</span>,</span>
<span class="pl-s1">              shadowOffsetX<span class="pl-k">:</span> <span class="pl-c1">0</span>,</span>
<span class="pl-s1">              shadowColor<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">"</span>rgba(0, 0, 0, 0.5)<span class="pl-pds">"</span></span></span>
<span class="pl-s1">            }</span>
<span class="pl-s1">          }</span>
<span class="pl-s1">        }</span>
<span class="pl-s1">      ]</span>
<span class="pl-s1">    });</span>
<span class="pl-s1"></span>
<span class="pl-s1">    <span class="pl-k">return</span> { options };</span>
<span class="pl-s1">  }</span>
<span class="pl-s1">});</span>
<span class="pl-s1">&lt;/<span class="pl-ent">script</span>&gt;</span>

<span class="pl-s1">&lt;<span class="pl-ent">style</span> <span class="pl-e">scoped</span>&gt;</span>
<span class="pl-s1"><span class="pl-e">.chart</span> {</span>
<span class="pl-s1">  <span class="pl-c1"><span class="pl-c1">height</span></span>: <span class="pl-c1">400<span class="pl-k">px</span></span>;</span>
<span class="pl-s1">}</span>
<span class="pl-s1">&lt;/<span class="pl-ent">style</span>&gt;</span></pre>
    <div class="zeroclipboard-container position-absolute right-0 top-0">
      <clipboard-copy
        aria-label="Copy"
        class="ClipboardButton btn js-clipboard-copy m-2 p-0 tooltipped-no-delay"
        data-copy-feedback="Copied!"
        data-tooltip-direction="w"
        value='<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  name: "HelloWorld",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  setup: () => {
    const option = ref({
      title: {
        text: "Traffic Sources",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
      },
      series: [
        {
          name: "Traffic Sources",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "Direct" },
            { value: 310, name: "Email" },
            { value: 234, name: "Ad Networks" },
            { value: 135, name: "Video Ads" },
            { value: 1548, name: "Search Engines" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });

    return { option };
  }
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>'
        tabindex="0"
        role="button"
        style="display: none"
      >
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          class="octicon octicon-copy js-clipboard-copy-icon m-2"
        >
          <path
            fill-rule="evenodd"
            d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
          ></path>
          <path
            fill-rule="evenodd"
            d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
          ></path>
        </svg>
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          class="octicon octicon-check js-clipboard-check-icon color-fg-success m-2 d-none"
        >
          <path
            fill-rule="evenodd"
            d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
          ></path>
        </svg>
      </clipboard-copy>
    </div>
  </div>
</template>
