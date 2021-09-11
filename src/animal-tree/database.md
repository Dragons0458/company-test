## To get the tree

We select all rows where id_ancestors on animal_tree_entity_closure table are equal to an id_ancestor and where the descendants are equal to the ids of animal_tree_entity table for get only the descendants of a node. 

```sql
SELECT ate.*
FROM animal_tree_entity ate
         JOIN animal_tree_entity_closure atec ON ate.id = atec.id_descendant
WHERE atec.id_ancestor = '1';
```
## To insert new node

First insert the node on the main table.

```sql
INSERT INTO animal_tree_entity
VALUES ('8', 'Insert test', '4');
```

Next, insert all the ancestors of the node.

```sql
INSERT INTO animal_tree_entity_closure(id_ancestor, id_descendant)
SELECT id_ancestor, '8'
FROM animal_tree_entity_closure
WHERE id_descendant = 4
UNION ALL
SELECT '8', '8';
```

## To Delete node that doesn't have children

Note: Have a problems with MySQL.

Delete only if the node doesn't have children.

```sql
DELETE
FROM animal_tree_entity
WHERE id IN (SELECT id
             FROM animal_tree_entity,
                  (SELECT COUNT(*) = 1 result FROM animal_tree_entity WHERE id = 8 || parentId = 8) can_delete
             WHERE (id = 8 || parentId = 8)
               AND can_delete.result = 1);
```

```sql
DELETE
FROM animal_tree_entity_closure
WHERE id_ancestor IN (SELECT id_ancestor
                      FROM animal_tree_entity_closure atec,
                           (SELECT COUNT(*) = 1 result FROM animal_tree_entity WHERE id = 2 || parentId = 2) can_delete
                      WHERE (id_descendant = 2 || id_ancestor = 2)
                        AND can_delete.result = 1)
  AND id_descendant IN (SELECT id_descendant
                        FROM animal_tree_entity_closure atec,
                             (SELECT COUNT(*) = 1 result
                              FROM animal_tree_entity
                              WHERE id = 2 || parentId = 2) can_delete
                        WHERE (id_descendant = 2 || id_ancestor = 2)
                          AND can_delete.result = 1);
```

## To update parent node

First, update the main table with the new parent node id.

```sql
UPDATE animal_tree_entity
SET parentId = 6
WHERE id = 8;
```

Second, delete all the ancestors of the node.

```sql
DELETE
FROM animal_tree_entity_closure
WHERE id_ancestor = 8 || id_descendant = 8;
```

The last step is insert the new ancestors of the node.

```sql
INSERT INTO animal_tree_entity_closure(id_ancestor, id_descendant)
SELECT id_ancestor, '8'
FROM animal_tree_entity_closure
WHERE id_descendant = 6
UNION ALL
SELECT '8', '8';
```
