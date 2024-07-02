<div class="container">
<header class="leftPanel">
    <a class="pageLink" href="/"><p style="margin-top: auto; margin-bottom: auto;">N</p></a>
    <a class="pageLink" href="/editor"><p style="margin-top: auto; margin-bottom: auto;">E</p></a>
    <a class="pageLink" href="/custom"><p style="margin-top: auto; margin-bottom: auto;">C</p></a>
</header>
<div class="content">
    <slot></slot>
</div>

</div>

<style>
    .pageLink {
        
        display: flex;
        border-bottom: 1px solid #fff;
        text-decoration: none;
        color: #fff;
        height:100%;
        width: 100%;
        justify-content: center;
        text-align: center;
        transition: 200ms;
    }

    .pageLink:hover {
        background-color: #333;
    }


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