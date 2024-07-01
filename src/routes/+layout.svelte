<div class="container">
<header class="leftPanel">
    <a href="/">M</a>
    <a href="/editor">E</a>
</header>
<div class="content">
    <slot></slot>
</div>

</div>

<style>
    .content {
        display: block
    }
    .container {
        border-top: 1px solid #b1b1b1;
        display: flex;
    }
    .leftPanel {
        border-right: 1px solid #b1b1b1;
        width: 40px;
        height: 100vh ;
        background-color: #000000;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
</style>