<#import "parts/common.ftl" as c>

<@c.page>
<div class="form-row">
    <div class="form-group col-md-6">
        <form method="get" action="/main" class="form-inline">
            <input type="text" name="filter" class="form-control" value="${filter?ifExists}" placeholder="Search by date">
            <button type="submit" class = "btn btn-primary ml-2">Search</button>
</form>
    </div>
</div>
   <#--<script type="text/javascript" src="bundle.js"></script></body>-->
</@c.page>


