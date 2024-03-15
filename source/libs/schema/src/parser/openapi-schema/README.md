
```diff
name // line_item
slug // line_items
- table_name // line_items
- class_name // LineItem
display_name
+ model_name
icon
searchable_columns
display_primary_key
```

columns
reference
```diff
{
  name: order_id
  column_type: reference
  reference: {
    name: order
    model_name: order
    reference_type: belongs_to
    foreign_key: order_id
    primary_key: id 
  }
}
```

associations
```diff
name: line_items
slug: line_items
model_name: line_item
foreign_key: product_id
primary_key: id
icon:
```

