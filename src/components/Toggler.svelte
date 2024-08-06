<label class="switch">
  <input type="checkbox" bind:checked={showMarkers}>
  <span class="slider round"></span>
</label>

<script lang="ts">
  export let showMarkers: boolean;
</script>

<style>
    /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 26px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--orange);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--orange);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 26px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>